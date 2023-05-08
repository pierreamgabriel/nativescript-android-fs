import { Utils } from "@nativescript/core";

let storage = {};

storage.save = function (folder, fileName) {
  let result;
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android"))
  );
  const storage1 = new java.io.File("/storage/emulated/0");
  const storage2 = new java.io.File("/sdcard");
  const input = new java.io.File(
    Utils.android.getApplicationContext().getFilesDir() + "/" + fileName
  );

  if (!input.exists()) {
    return false;
  } else {
    if (storage0.exists()) {
      process(storage0);
    } else if (storage1.exists()) {
      process(storage1);
    } else if (storage2.exists()) {
      process(storage2);
    } else {
      return false;
    }
  }

  function process(arg) {
    let myOutput;
    let myInput;
    try {
      const javaFolder = new java.io.File(arg + folder);
      if (!javaFolder.exists()) {
        javaFolder.mkdirs();
        javaFolder.setReadable(true);
        javaFolder.setWritable(true);
      }
    } catch (err) {}

    try {
      const buffer = java.lang.reflect.Array.newInstance(
        java.lang.Byte.class.getField("TYPE").get(null),
        1024
      );
      let length;
      myInput = new java.io.FileInputStream(input);
      myOutput = new java.io.FileOutputStream(arg + folder + "/" + fileName);
      while ((length = myInput.read(buffer)) > 0) {
        myOutput.write(buffer, 0, length);
      }
    } catch (err) {
    } finally {
      myOutput.flush();
      myOutput.close();
      myInput.close();

      result = true;
    }
  }

  return result;
};

storage.check = function (folder, fileName) {
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android")) +
      folder +
      "/" +
      fileName
  );
  const storage1 = new java.io.File(
    "/storage/emulated/0" + folder + "/" + fileName
  );
  const storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);

  if (storage0.exists()) {
    return true;
  } else if (storage1.exists()) {
    return true;
  } else if (storage2.exists()) {
    return true;
  } else {
    return false;
  }
};

storage.import = function (folder, fileName) {
  let output;
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android")) +
      folder +
      "/" +
      fileName
  );
  const storage1 = new java.io.File(
    "/storage/emulated/0" + folder + "/" + fileName
  );
  const storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);
  let input;

  if (storage0.exists()) {
    input = new java.io.FileInputStream(storage0);
  } else if (storage1.exists()) {
    input = new java.io.FileInputStream(storage1);
  } else if (storage2.exists()) {
    input = new java.io.FileInputStream(storage2);
  } else {
    return false;
  }

  try {
    const buffer = java.lang.reflect.Array.newInstance(
      java.lang.Byte.class.getField("TYPE").get(null),
      1024
    );
    let length;
    output = new java.io.FileOutputStream(
      Utils.android.getApplicationContext().getFilesDir() + "/" + fileName
    );
    while ((length = input.read(buffer)) > 0) {
      output.write(buffer, 0, length);
    }
  } catch (err) {
    return false;
  } finally {
    output.flush();
    output.close();
    input.close();
  }
  return true;
};

storage.create = function (folderName, fileName, text) {
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android"))
  );
  const storage1 = new java.io.File("/storage/emulated/0");
  const storage2 = new java.io.File("/sdcard");
  let file;

  if (text == null) {
    text = "";
  }

  if (storage0.exists()) {
    file = new java.io.File(storage0 + folderName + "/" + fileName);
    const folder = new java.io.File(storage0 + folderName);

    if (!folder.exists()) {
      folder.mkdirs();
      folder.setReadable(true);
      folder.setWritable(true);
    }
  } else if (storage1.exists()) {
    file = new java.io.File(storage1 + folderName + "/" + fileName);
    const folder = new java.io.File(storage1 + folderName);

    if (!folder.exists()) {
      folder.mkdirs();
      folder.setReadable(true);
      folder.setWritable(true);
    }
  } else if (storage2.exists()) {
    file = new java.io.File(storage2 + folderName + "/" + fileName);
    const folder = new java.io.File(storage2 + folderName);

    if (!folder.exists()) {
      folder.mkdirs();
      folder.setReadable(true);
      folder.setWritable(true);
    }
  } else {
    return false;
  }

  if (file.createNewFile()) {
    const myWriter = new java.io.FileWriter(file);
    myWriter.write(text);
    myWriter.close();

    return true;
  } else {
    return false;
  }
};

storage.read = function (folder, fileName) {
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android")) +
      folder +
      "/" +
      fileName
  );
  const storage1 = new java.io.File(
    "/storage/emulated/0" + folder + "/" + fileName
  );
  const storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);

  if (storage0.exists()) {
    const read = new java.util.Scanner(storage0).useDelimiter("\\Z").next();
    return read;
  } else if (storage1.exists()) {
    const read = new java.util.Scanner(storage1).useDelimiter("\\Z").next();
    return read;
  } else if (storage2.exists()) {
    const read = new java.util.Scanner(storage2).useDelimiter("\\Z").next();
    return read;
  }
};

storage.delete = function (folder, fileName) {
  let response = false;
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android")) +
      folder +
      "/" +
      fileName
  );
  const storage1 = new java.io.File(
    "/storage/emulated/0" + folder + "/" + fileName
  );
  const storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);
  let file;

  if (storage0.exists()) {
    file = storage0;
  } else if (storage1.exists()) {
    file = storage1;
  } else if (storage2.exists()) {
    file = storage2;
  } else {
    return false;
  }

  if (file.delete()) {
    response = true;
  }
  return response;
};

storage.content = function (type, folder) {
  let array = [];
  let content;
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android"))
  );
  const storage1 = new java.io.File("/storage/emulated/0");
  const storage2 = new java.io.File("/sdcard");

  if (storage0.exists()) {
    content = new java.io.File(storage0 + folder).listFiles();
  } else if (storage1.exists()) {
    content = new java.io.File(storage1 + folder).listFiles();
  } else if (storage2.exists()) {
    content = new java.io.File(storage2 + folder).listFiles();
  } else {
    return array;
  }

  if (type === "file") {
    for (let j = 0; j < content.length; j++) {
      if (content[j].isFile()) {
        array.push(content[j].getName());
      }
    }
  } else if (type === "directory") {
    for (let j = 0; j < content.length; j++) {
      if (content[j].isDirectory()) {
        array.push(content[j].getName());
      }
    }
  }
  return array;
};

storage.permission = function (folder, fileName) {
  let response = false;
  const filesDir = Utils.android
    .getApplicationContext()
    .getExternalFilesDir(null)
    .getAbsolutePath();
  const storage0 = new java.io.File(
    filesDir.substring(0, filesDir.indexOf("/Android")) +
      folder +
      "/" +
      fileName
  );
  const storage1 = new java.io.File(
    "/storage/emulated/0" + folder + "/" + fileName
  );
  const storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);

  if (storage0.exists()) {
    if (storage0.canWrite()) {
      response = true;
    }
  } else if (storage1.exists()) {
    if (storage1.canWrite()) {
      response = true;
    }
  } else if (storage2.exists()) {
    if (storage2.canWrite()) {
      response = true;
    }
  }
  return response;
};

export default storage;
