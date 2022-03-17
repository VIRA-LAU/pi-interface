import RPi.GPIO as GPIO
import time


class Servo:
    def __init__(self, sig: int, starting_pos: float = 0, min_angle: float = 0,
                 max_angle: float = 180):
        """
        :param sig: sig pin (BCM)
        :param starting_pos: initial position in degrees
        :param min_angle: in degrees (default: 0)
        :param max_angle: in degrees (default: 180)
        """
        self.angle = starting_pos
        self.min_angle = min_angle
        self.max_angle = max_angle
        self.a = 10
        self.b = 2
        self.sig = sig
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(sig, GPIO.OUT)
        self.pwm = GPIO.PWM(sig, 50)
        self.pwm.start(0)
        self.set_angle(self.angle)
        time.sleep(2)

    def set_angle(self, angle: float):
        """
        Set the servo angle to the given angle
        :param angle: in degrees
        """
        angle = self.validate_angle(angle)
        self.angle = angle
        duty = self.a / 180 * self.angle + self.b
        self.pwm.ChangeDutyCycle(duty)
        print("angle =", self.angle, "-> duty cycle =", duty)
        time.sleep(0.05)

    def validate_angle(self, angle: float):
        """
        Checks whether the angle is within the limits given and adjusts it if its not
        :param angle: The angle to be validated (in degrees)
        :return: Validated angle (within given bounds)
        """
        if angle > self.max_angle:
            angle = self.max_angle
        if angle < self.min_angle:
            angle = self.min_angle
        return angle

    def increment_angle(self, inc: int):
        """
        Increments the servo angle by a given value
        :param inc: angle change (delta angle)
        :return: None
        """
        self.set_angle(self.angle + inc)

    def decrement_angle(self, dec: int):
        """
        Decrements the servo angle by a given value
        :param dec: angle change (delta angle)
        :return: None
        """
        self.set_angle(self.angle - dec)


def main():
    s = Servo(14, 2, 2, 176)
    s.increment_angle(170)


if __name__ == '__main__':
    main()
