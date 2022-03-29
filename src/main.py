from flask import Flask, render_template, Response, request, jsonify
from flask_cors import cross_origin
import to_endpoint

from motor import Motors
from servo import Servo

m = Motors(12, 13, 25, 1, 7, 8, 100)
servo_x = Servo(14, 72, 1.8, 176.4)
servo_y = Servo(15, 162, 1.8, 176.4)
time = 0.8
angle_change = 5
app = Flask(__name__)
camera = to_endpoint.Camera()
camera.start()
m = to_endpoint.main(upload=False, drive=True, delete=True)


@app.route('/')
def index():
    return render_template('index.js')


def gen():
    while True:
        try:
            frame = camera.get_frame()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        except:
            pass


@app.route('/video_feed')
def video_feed():
    return Response(gen(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/left_joystick', methods=['POST'])
@cross_origin()
def rover_control():
    data = request.get_json()
    x = data['X']
    y = data['Y']
    print('Rover:')
    if y > 0.5:
        print('\tMoving Forward')
        m.move_forward(t=time)
    elif y < -0.5:
        print('\tMoving Backward')
        m.move_backward(t=time)
    elif x > 0.5:
        print('\tTurning Right')
        m.turn_right(t=time)
    elif x < -0.5:
        print('\tTurning Left')
        m.turn_left(t=time)
    else:
        print('Nothing')
    return jsonify(data)


@app.route('/right_joystick', methods=['POST'])
@cross_origin()
def camera_control():
    data = request.get_json()
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


@app.route('/record', methods=['POST'])
@cross_origin()
def record():
    data = request.get_json()['record']
    print(data)
    if data:
        m.run()
    else:
        m.terminate()
    return jsonify(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=False, debug=False)
