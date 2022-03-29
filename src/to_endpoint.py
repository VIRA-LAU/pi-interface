import os
import time
import cv2
import requests
from datetime import datetime
from threading import Thread

from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

Folder = datetime.now().strftime('%d-%m-%Y_%I-%M-%S-%p')
CODEC = cv2.VideoWriter_fourcc(*'XVID')
EXTENSION = '.avi'
VIDEO_LENGTH = 10  # seconds
FRAMES_PER_SECOND = 30
FRAME_WIDTH = 1280
FRAME_HEIGHT = 720
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
        os.makedirs(Folder)
        self.out = cv2.VideoWriter(Folder + "/" + str(file) + EXTENSION,
                                   CODEC, FRAMES_PER_SECOND,
                                   (FRAME_WIDTH, FRAME_HEIGHT))

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

            ret, self.frame = self.cap.read()
            if ret:
                self.out.write(self.frame)
            else:
                break
            end_time = time.time()

    def get_frame(self):
        # cv2.imwrite('frame.jpg', self.frame)
        ret, jpeg = cv2.imencode('.jpg', self.frame)
        return jpeg.tobytes()


class main:
    def __init__(self, upload: bool, drive: bool, delete: bool):
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
        self.drive = drive
        self.delete = delete
        if self.drive:
            gauth = GoogleAuth()
            gauth.LoadCredentialsFile("mycreds.txt")
            if gauth.credentials is None:
                gauth.LocalWebserverAuth()
            elif gauth.access_token_expired:
                gauth.Refresh()
            else:
                gauth.Authorize()
            gauth.SaveCredentialsFile("mycreds.txt")
            self.d = GoogleDrive(gauth)
            folder = self.d.CreateFile({'title': Folder, 'mimeType': 'application/vnd.google-apps.folder'})
            folder.Upload()
            self.parent_id = folder['id']

    def terminate(self):
        print("Terminated Recording")
        self._running = False
        # self.session.close()

    def run(self):
        self._running = True
        self.to_send = file
        self.to_delete = 0
        while self._running:
            if os.path.exists(Folder + "/" + str(self.to_send + 1) + EXTENSION) and self.upload:
                print('Sending ' + str(self.to_send) + EXTENSION)
                f = {'file': open(Folder + "/" + str(self.to_send) + EXTENSION, 'rb')}
                r = self.session.post(self.url, files=f)
                self.to_send += 1
                print(r.status_code)
                print(r.text)

            if os.path.exists(Folder + "/" + str(self.to_send + 1) + EXTENSION) and self.drive:
                print('Sending ' + str(self.to_send) + EXTENSION)
                self.f = self.d.CreateFile(
                    {'title': self.to_send, 'parents': [{'id': self.parent_id}]})
                self.f.SetContentFile(Folder + "/" + str(self.to_send) + EXTENSION)
                self.f.Upload()
                self.f.content.close()
                self.to_send += 1

            if not os.path.exists(Folder + "/" + str(self.to_delete) + EXTENSION):
                self.to_delete += 1
            if os.path.exists(Folder + "/" + str(self.to_delete) + EXTENSION) and os.path.exists(
                    Folder + "/" + str(self.to_delete + 2) + EXTENSION) and self.delete:
                print("Deleting " + str(self.to_delete) + EXTENSION)
                os.remove(Folder + "/" + str(self.to_delete) + EXTENSION)
                self.to_delete += 1


if __name__ == '__main__':
    camera = Camera()
    m = main(upload=False, drive=True, delete=True)
