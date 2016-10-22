@echo off
@echo -- bundling --
call ionic build android --release
IF %ERRORLEVEL% == 0 (
    @echo -- signing --
    call "%JAVA_HOME%\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\build\outputs\apk\android-release-unsigned.apk alias_name
)
IF %ERRORLEVEL% == 0 (
    @echo -- zipalign --
    call  del platforms\android\build\outputs\apk\android-release-signed.apk
    call "%ANDROID_HOME%\build-tools\24.0.3\zipalign.exe" -v 4 platforms\android\build\outputs\apk\android-release-unsigned.apk platforms\android\build\outputs\apk\android-release-signed.apk
)
