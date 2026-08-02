#!/usr/bin/env python3

from modes.adb_mode import ADBMode
from modes.edl_mode import EDLMode


def menu():

    print("""
    Android Security Analysis Toolkit

    1 - ADB Analysis Mode
    2 - EDL Research Mode
    3 - Qualcomm Research Mode
    4 - BROM Research Mode
    5 - Test Point Research Mode
    6 - EUB Research Mode

    """)


def main():

    menu()

    choice = input("Select mode: ")

    if choice == "1":
        ADBMode().run()

    elif choice == "2":
        EDLMode().run()

    else:
        print("Mode not implemented yet")


if __name__ == "__main__":
    main()
