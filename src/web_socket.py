from flask import Flask, render_template, jsonify, Response
from flask_socketio import SocketIO
from to_endpoint import Camera, ToEndpoint

from motor import Motors
from servo import Servo
from ultrasonic import Ultrasonic

motors = Motors(12, 13, 25, 1, 7, 8, 100)
servo_x = Servo(14, 72, 1.8, 176.4)
servo_y = Servo(15, 162, 1.8, 176.4)
ultra = Ultrasonic(23, 24)

time = 0.1
angle_change = 3

app = Flask(__name__)
socket = SocketIO(app, cors_allowed_origins="*")
camera = Camera()
endpoint = ToEndpoint()


@app.route('/')
def index():
    return render_template('index.js')


@socket.on('connect')
def connected():
    print('Client connected to websocket')
    return True


@socket.on('disconnect')
def connected():
    print('Client disconnected from websocket')
    return True


def gen():
    while True:
        try:
            frame = camera.get_frame()
            socket.sleep(0.01)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        except:
            pass


@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@socket.on('left_joystick')
def rover_control(data):
    x = data['X']
    y = data['Y']
    distance = ultra.get_dstance()
    print('Distance = ' + str(distance))
    print('Rover:')
    if y > 0.5 and distance > 20:
        print('\tMoving Forward')
        motors.move_forward(t=time)
    elif y < -0.5:
        print('\tMoving Backward')
        motors.move_backward(t=time)
    elif x > 0.5:
        print('\tTurning Right')
        motors.turn_right(t=time)
    elif x < -0.5:
        print('\tTurning Left')
        motors.turn_left(t=time)
    else:
        print('Nothing')
    return jsonify(data)


@socket.on('right_joystick')
def camera_control(data):
    x = data['X']
    y = data['Y']
    # print(data)
    print('Camera:')
    if y > 0.5:
        print('\tMoving Up')
        servo_y.decrement_angle(angle_change)
    elif y < -0.5:
        print('\tMoving Down')
        servo_y.increment_angle(angle_change)
    elif x > 0.5:
        print('\tMoving Right')
        servo_x.decrement_angle(angle_change)
    elif x < -0.5:
        print('\tMoving Left')
        servo_x.increment_angle(angle_change)
    else:
        print('Nothing')
    return jsonify(data)


@socket.on("record")
def record(data):
    rec = data['record']
    if rec:
        endpoint.set_drive(True)
    else:
        endpoint.set_drive(False)
    return jsonify(data)


if __name__ == '__main__':
    camera.start()
    endpoint.start()
    socket.run(app, host='0.0.0.0', port=5000, use_reloader=False, debug=True)
