var application = require("@nativescript/core/application");

var storage = {};

storage.save = function (folder, fileName) {
	
var result;	
var storage1 = new java.io.File("/storage/emulated/0");
var storage2 = new java.io.File("/sdcard");	
var input = new java.io.File(application.android.context.getFilesDir() + "/" + fileName);	
	
	if (!input.exists()) {
		
		return false;
		
	} else {
		
		if (storage1.exists()) {
		
		process(storage1);
		
	} else if (storage2.exists()) {
		
		process(storage2);
		
	}  else {
		
		return false;
	}
		
		
	}
	
	
	function process(arg) {
		
	try {
		
        var javaFolder = new java.io.File(arg + folder);
        if (!javaFolder.exists()) {
            javaFolder.mkdirs();
            javaFolder.setReadable(true);
            javaFolder.setWritable(true);
        } 
    }
    catch (err) {
		
    }	

    try {
		
        var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.class.getField("TYPE").get(null), 1024);
        var length;
		var myInput = new java.io.FileInputStream(input);
		var myOutput = new java.io.FileOutputStream(arg + folder + "/" + fileName);
        while ((length = myInput.read(buffer)) > 0) {
            myOutput.write(buffer, 0, length);
			
        }
    }
    catch (err) {
        
		
    } finally {
		
		myOutput.flush();
        myOutput.close();
        myInput.close();
		
		result = true;
		
	}
		  
			
	}
    
	return result;
	
}

storage.check = function (folder, fileName) {
	
var storage1 = new java.io.File("/storage/emulated/0" + folder + "/" + fileName);
var storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);	
	
	if (storage1.exists()) {
		
		return true;
		
	} else if (storage2.exists()) {
		
		return true;
		
	}  else {
		
		return false;
	}
	
}

storage.import = function (folder, fileName) {
	
var storage1 = new java.io.File("/storage/emulated/0" + folder + "/" + fileName);
var storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);
var input;	
	
	
	if (storage1.exists()) {
		
		input = new java.io.FileInputStream(storage1);
		
	} else if (storage2.exists()) {
		
		input = new java.io.FileInputStream(storage2);
		
	}  else {
		
		return false;
	}
		
	
	try {
		
        var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.class.getField("TYPE").get(null), 1024);
        var length;
		var output = new java.io.FileOutputStream(application.android.context.getFilesDir() + "/" + fileName);
        while ((length = input.read(buffer)) > 0) {
            output.write(buffer, 0, length);
		
        }
    }
    catch (err) {
		
		
    } finally {
		
		output.flush();
        output.close();
        input.close();
		
		return true;
	}	
	
		
}

storage.create = function (folder, fileName, text) {
	
	var storage1 = new java.io.File("/storage/emulated/0");
    var storage2 = new java.io.File("/sdcard");	
	var file;
	
	if (text === null) {
		
		text = "";
	}
	
	if (storage1.exists()) {
		
		file = new java.io.File(storage1 + folder + "/" + fileName);
		var folder = new java.io.File(storage1 + folder); 

		if (!folder.exists()) {
            folder.mkdirs();
            folder.setReadable(true);
            folder.setWritable(true);
        } 
		
		
	} else if (storage2.exists()) {
		
		file = new java.io.File(storage2 + folder + "/" + fileName);
		var folder = new java.io.File(storage2 + folder); 
		
		if (!folder.exists()) {
            folder.mkdirs();
            folder.setReadable(true);
            folder.setWritable(true);
        } 
		
		
	}  else {
		
		return false;
	}
	
	if (file.createNewFile()) {
		
	var myWriter = 	new java.io.FileWriter(file);
	myWriter.write(text);
	myWriter.close();	
		
		return true;
		
	} else {
		
		return false;
	}
}

storage.delete = function (folder, fileName) {
	
  var storage1 = new java.io.File("/storage/emulated/0" + folder + "/" + fileName);
  var storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);	
  var file;	
	
	if (storage1.exists()) {
		
		file = storage1;
		
	} else if (storage2.exists()) {
		
		file = storage2;
		
	}  else {
		
		return false;
	}
	
	if (file.delete()) {
			
			return true;
			
		} else {
			
			return false;
		}
	
}

storage.content = function (type, folder) {

var array = [];
var content;
var storage1 = new java.io.File("/storage/emulated/0");
var storage2 = new java.io.File("/sdcard");	
	
	if (storage1.exists()) {
			
		content = new java.io.File(storage1 + folder).listFiles();	
		
		} else if (storage2.exists()) {
		
		content = new java.io.File(storage2 + folder).listFiles();
			
		} else {
			
			return false;
		}
	
	if (type === "file") {
		
		for (var j = 0; j < content.length; j++ ) {
			
			if (content[j].isFile()) {
			
			array.push(content[j].getName());
		}
			
		}	
		
		return array;
		
	} else if (type === "directory") {
		
		for (var j = 0; j < content.length; j++ ) {
			
			if (content[j].isDirectory()) {
			
			array.push(content[j].getName());
		}
			
		}	
		
		return array;
	}
	
}

storage.permission = function (folder, fileName) {
	
  var storage1 = new java.io.File("/storage/emulated/0" + folder + "/" + fileName);
  var storage2 = new java.io.File("/sdcard" + folder + "/" + fileName);	
	
	if (storage1.exists()) {
		
		if (storage1.canWrite()) {
			
			return true;
			
		} else {
			
			return false;
		}
		
	} else if (storage2.exists()) {
		
		if (storage2.canWrite()) {
			
			return true;
			
		} else {
			
			return false;
		}
		
	} else {
		
		return false;
	} 
	
}

module.exports = storage;