#!/bin/sh
#Functionality for signing macos package


import_certificate() {
    CERTIFICATE=$RUNNER_TEMP/certificate.p12
    OSX_KEYCHAIN=$RUNNER_TEMP/app-signing.keychain-db
    # import certificate from secrets
    echo -n "$OSX_INSTALLER_CERT_BASE64" | base64 --decode --output $CERTIFICATE
    # genrate random keychain password
    OSX_KEYCHAIN_PASSWORD=`openssl rand -hex 12`
    # create new keychain
    security create-keychain -p "$OSX_KEYCHAIN_PASSWORD" $OSX_KEYCHAIN
    security unlock-keychain -p "$OSX_KEYCHAIN_PASSWORD" $OSX_KEYCHAIN
    # set keycahin configuration (lock after timeout etc)
    security set-keychain-settings -lut 21600 $OSX_KEYCHAIN
    # import certificate to keychain
    security import $CERTIFICATE -k $OSX_KEYCHAIN -f pkcs12 -A -T /usr/bin/codesign -T /usr/bin/security -P "$OSX_INSTALLER_CERT_PASSWORD"
    security set-key-partition-list -S apple-tool:,apple: -k "$OSX_KEYCHAIN_PASSWORD" $OSX_KEYCHAIN

    security list-keychains -d user -s $OSX_KEYCHAIN login.keychain
    #security import $CERTIFICATE_PATH -k $KEYCHAIN_PATH -A -P $OSX_INSTALLER_CERT_PASSWORD -T /usr/bin/codesign -T /usr/bin/security
    security find-identity
}
notarize_and_staple() {
    FILE_PATH="$1"
    #Functionality  to notarize application
    xcrun notarytool store-credentials new-profile --apple-id "$APPLE_ID" --password "$APPLE_ID_APP_PASSWORD" --team-id "$APPLE_TEAM_ID"
    # wait for notarization response and capture it in notarization_log.json
    xcrun notarytool submit "$FILE_PATH" --keychain-profile new-profile --wait -f json > $RUNNER_TEMP/notarization_log.json
    notarization_status=$(jq -r .status $RUNNER_TEMP/notarization_log.json)
    notarization_id=$(jq -r .id $RUNNER_TEMP/notarization_log.json)
    echo "for notarization id ${notarization_id} the status is ${notarization_status}"
    if [ "${notarization_status}" = "Accepted" ]
    then
      xcrun stapler staple "$FILE_PATH"
      spctl --assess -vv --type install "$FILE_PATH"
    else
      echo "Notarization unsuccessfull"
      #display notarization logs for error
      xcrun notarytool log ${notarization_id} --keychain-profile new-profile $RUNNER_TEMP/notarization_log.json
      jq . $RUNNER_TEMP/notarization_log.json
      exit 1
    fi
}

pack_macos() {
#  if [ "$REPOSITORY_OWNER" == "twilio" ]
#  then
    import_certificate
    #npx oclif pack:macos
    npx oclif-dev pack:macos
#   notarize_and_staple "$FILE_PATH_ARM64"
    notarize_and_staple "$FILE_PATH_X64"
#  else
#   npx oclif pack:macos
 # fi
}

make install
brew install makensis
pack_macos
