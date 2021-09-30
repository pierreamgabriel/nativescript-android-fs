# NativeScript Android Filesystem

This plugin allows Android apps to work with files and folders in external/shared storage, and it's very easy to use. It works on all Android versions, including 11+.

## Features

- Save to external storage
- Import to app's files in internal storage
- Check if a file exists
- Create text files
- Delete files
- List directories and files
- Check permission to modify a file (Android 11)

## Instalation

```bash
tns plugin add nativescript-android-fs
```

## Usage

```javascript
var storage = require("nativescript-android-fs");
```

## First instructions

This plugin works by copying files to and from internal and external storage. All files you want to save inside a folder in external storage must come from your `/data/user/0/com.package.name/files`. For example, if you want to transfer "my-image.jpg" to `/Pictures`, that file must be inside your app internal storage located at `/data/user/0/com.package.name/files`. You can get the direct path to your app files directory by using this: `application.android.context.getFilesDir()`, but feel free to use any method you want, as long as it returns the right path to the files folder inside your app internal storage. When you import files to your app, they'll be saved in that folder too.

## Android 11

With Android 11, apps don't need to request permission to use public folders, such as Documents, Download, Pictures, Music, etc., but your app can only read and modify files it creates. For example, if someone installs your app and saves a backup in /Documents/backup, and then uninstalls the app, when he installs it again, that backup file can't be used by the app anymore. So let your users know about this important detail.

Also, except for Documents and Download, only the appropriate files format can be saved in Pictures (images), Music (audio), Movies (videos), and other public folders. 

## Android 10 and below

On Android 10 devices, you can disable scoped storage if you want to by adding the following to your AndroidManifest.xml:

```xml
<application android:requestLegacyExternalStorage="true">
```

For all the other versions below 10, you also need to add the following lines:

```xml
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29"/>
```

And, of course, you need to request user permission in your app code. You can use the nativescript-permissions plugin for that task.

## List of arguments

Before presenting the functions that you can use in this plugin, let's know their arguments first.

### folder

The target folder with or without a subfolder where you want to save files. If the folder or subfolder doesn't exist, it'll be created automatically. On Android 11, only public folders can be created in the root directory. For example, if you target the Download folder but it doesn't exist, the plugin will create it. 

Important: Don't mistake Download for Downloads because they're not the same. The latter won't be created on Android 11.

Example:

```
"/Documents"
"/Documents/myfolder"
"/Pictures"
```

Always begin the string with a slash "/" but don't include one at the end. If you pass an empty string "", files will be saved in the root directory on Android 10 and below. On Android 11, apps can't use the root directory.

### fileName

When saving to external storage, it's the name of the file located in `/data/user/0/com.package.name/files`. When importing to your app's folder, it's the name of the file located in the external storage.

Example:

```
"myfile.txt"
"myimage.jpg"
```

### text

The string with the text you want to write to the file created with the `storage.create` function.

### type

This argument is only used in the `storage.content` function when you want to retrieve a list of files or directories. So you should specify if it's "file" or "directory" what you want.

## Functions

### storage.save

It copies a file from `/data/user/0/com.package.name/files` to external storage.

```javascript
storage.save(folder, fileName);
```

Example:

```javascript
var file = storage.save("/Documents", "my-file.doc");

if (file) {

// File copied to external storage

}
```

If a file with the same name already exists inside the destination folder, it'll be overwritten on Android 10 and below, but on Android 11, the function will fail if your app doesn't own the file.

### storage.import

It copies a file from external storage to `/data/user/0/com.package.name/files`. 

```javascript
storage.import(folder, fileName);
```

Example:

```javascript
var file = storage.import("/Pictures", "my-picture.jpg");

if (file) { 

// File successfully imported

}
```

On Android 11, no file will be imported if your app doesn't own the file.

### storage.check 

It checks if a file exists. It’ll check all files, including the ones not belonging to your app. It’s useful to avoid conflicts in file names because, on Android 11, an app can’t override a file it didn’t create.

```javascript
storage.check(folder, fileName);
```

Example:

```javascript
var file = storage.check("/Download", "my-file.txt");

if (file) {

// File exists

}
```

### storage.create

It creates a text file.

```javascript
storage.create(folder, fileName, text);
```

Example:

```javascript
var file = storage.create("/Documents", "new-file.txt", "Hey, this is my file!");

if (file) {

// File created

}
```

### storage.content

It returns an array with a list of files or directories. On Android 11, you can only retrieve files created by your app.

```javascript
storage.content(type, folder);
```

Example:

```javascript
var files = storage.content("file", "/Documents");
var directories = storage.content("directory", "/DCIM");
```

### storage.delete

It deletes any file on Android 10 and below, and only the files created by your app on Android 11.

```javascript
storage.delete(folder, fileName);
```

Example:

```javascript
var file = storage.delete("/Documents", "my-file.doc");

if (file) {

// File deleted

}
```

### storage.permission (for Android 11 and above)

Before your app can do anything with a file on Android 11, it first needs to know if it has permission. For example, an app can't read, replace, or rename a file without being the owner of that file.

```javascript
storage.permission(folder, fileName); 
```

Example:

```javascript
var file = storage.permission("/Documents", "my-file.doc");

if (file) {

    // Yes, I can work with that file.
}
```

## Contact me

For job opportunities, you can contact me at pierremacedodev@gmail.com. For issues or feature requests, please use the plugin repository.

## Donate [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate?hosted_button_id=W93EHM59W7BA8)
It's hard to keep plugins updated and bug-free without financial support. If you found this plugin useful, consider donating.
