import subprocess


def check_adb():

    try:
        result = subprocess.check_output(
            ["adb", "devices"]
        )

        return result.decode()

    except Exception:
        return "ADB unavailable"
