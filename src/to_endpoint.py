import os
import time
import cv2
import requests
from datetime import datetime
from threading import Thread

Folder = datetime.now().strftime('%d-%m-%Y_%I-%M-%S-%p')
CODEC = cv2.VideoWriter_fourcc(*'XVID')
EXTENSION = '.avi'
VIDEO_LENGTH = 10  # seconds
FRAMES_PER_SECOND = 30
FRAME_WIDTH = 320
FRAME_HEIGHT = 240
file = 0


class Camera(Thread):
    def __init__(self):
        global file
        Thread.__init__(self)
        self._running = True
        self.cap = cv2.VideoCapture(0)
        # print('Capturing Video')
        if not self.cap.isOpened():
            print("Unable to read camera feed")
        self.cap.set(3, FRAME_WIDTH)
        self.cap.set(4, FRAME_HEIGHT)
        self.cap.set(5, FRAMES_PER_SECOND)
        # file = 0
        # self.i = 0
        os.makedirs(Folder)
        self.out = cv2.VideoWriter(Folder + "/" + str(file) + EXTENSION,
                                   CODEC, FRAMES_PER_SECOND,
                                   (FRAME_WIDTH, FRAME_HEIGHT))
        self.start()

    def terminate(self):
        print('Terminated Camera')
        self._running = False
        self.cap.release()
        self.out.release()
        cv2.destroyAllWindows()

    def run(self):
        global file
        start_time = time.time()
        end_time = 0
        while self._running:
            # print("Camera Thread Running")
            if end_time - start_time > VIDEO_LENGTH:
                print('Generating new video')
                self.out.release()
                file += 1
                self.out = cv2.VideoWriter(Folder + "/" + str(file) + EXTENSION,
                                           CODEC, FRAMES_PER_SECOND,
                                           (FRAME_WIDTH, FRAME_HEIGHT))
                start_time = time.time()

            ret, frame = self.cap.read()
            # self.i += 1
            if ret:
                # if self.i == 5:
                #     self.i = 0
                cv2.imwrite('frame.jpg', frame)
                self.out.write(frame)
            else:
                break
            end_time = time.time()


class main:
    def __init__(self, upload: bool, delete: bool):
        """
        :param upload: Upload to endpoint
        :param delete: Delete uploaded
        """
        self._running = True
        self.session = requests.Session()
        del self.session.headers['User-Agent']
        del self.session.headers['Accept-Encoding']
        self.url = 'https://7c99-185-104-185-150.ngrok.io/api/v1/public/upload-video'
        self.upload = upload
        self.delete = delete

    def terminate(self):
        print("Terminated Recording")
        self._running = False
        self.session.close()

    def run(self):
        self.to_send = file
        self.to_delete = 0
        while self._running:
            if os.path.exists(Folder + "/" + str(self.to_send + 1) + EXTENSION) and self.upload:
                f = {'file': open(Folder + "/" + str(self.to_send) + EXTENSION, 'rb')}
                r = self.session.post(self.url, files=f)
                self.to_send += 1
                print(r.status_code)
                print(r.text)
            if os.path.exists(Folder + "/" + str(self.to_delete + 2) + EXTENSION) and self.delete:
                print("Deleting " + str(self.to_delete) + EXTENSION)
                os.remove(Folder + "/" + str(self.to_delete) + EXTENSION)
                self.to_delete += 1


if __name__ == '__main__':
    camera = Camera()
    m = main(upload=False, delete=True)