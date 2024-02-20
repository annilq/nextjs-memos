---
title:  android 升级功能
date: 2023-05-29 18:18:40
tags: android apk update
---

### 使用DownloadManager下载apk，下载完成后会发送<code>DownloadManager.ACTION_DOWNLOAD_COMPLETE</code>广播
```java

    private BroadcastReceiver onDownloadComplete = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            //Fetching the download id received with the broadcast
            long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
            //Checking if the received broadcast is for our enqueued download by matching download id
            if (downloadID == id) {
                Toast.makeText(application, "Download Completed", Toast.LENGTH_SHORT).show();
                installApp();
            }
        }
    };

    public void Download() {
//        String url = "http://jgoa-test.oss-cn-hangzhou.aliyuncs.com/apk/school.apk";
        String url = "http://192.168.0.96:3000/api/school.apk";
        File file = new File(getAPPPath());

        registerReceiver(onDownloadComplete, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));

        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url))
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_HIDDEN)// Visibility of the download Notification
//                .setTitle("hhha")
//                .setDescription("hhhwwwa")
                .setDestinationUri(Uri.fromFile(file))// Uri of the destination file
                .setRequiresCharging(false)// Set if charging is required to begin the download
                .setAllowedOverMetered(true)// Set if download is allowed on Mobile network
                .setAllowedOverRoaming(true);// Set if download is allowed on roaming network

        DownloadManager downloadManager = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
        downloadID = downloadManager.enqueue(request);// enqueue puts the download request in the queue.
    }

// 用户安装apk
    public void installApp() {
       String apkPath = getAPPPath();
       try {
           Intent intent = new Intent(Intent.ACTION_VIEW);
           //版本在7.0以上是不能直接通过uri访问的
           if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
               File file = (new File(apkPath));
               intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
               Uri contentUri = FileProvider.getUriForFile(this, BuildConfig.APPLICATION_ID + ".fileProvider", file);
               intent.setDataAndType(contentUri, "application/vnd.android.package-archive");
           } else {
               intent.setDataAndType(Uri.fromFile(new File(apkPath)),
                       "application/vnd.android.package-archive");
           }
           intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
           startActivity(intent);
           //必须加入，不然不会显示安装成功界面
           android.os.Process.killProcess(android.os.Process.myPid());
       } catch (Exception e) {
           e.printStackTrace();
       }
   }
```

### 参考
1. [Downloading File properly in Android](https://medium.com/@aungkyawmyint_26195/downloading-file-properly-in-android-d8cc28d25aca)
1. [install apk depend on different android version](https://stackoverflow.com/questions/39332842/no-activity-found-to-handle-intent-when-using-fileprovider/39333203#39333203)
