import cv2


# class VideoCamera(object):
#     def __init__(self):
#         pass
#         self.video = cv2.VideoCapture(0)

#     def __del__(self):
#         self.video.release()
def get_frame():
    #         ret, frame = self.video.read()
    frame = cv2.imread('frame.jpg')
    ret, jpeg = cv2.imencode('.jpg', frame)
    return jpeg.tobytes()
