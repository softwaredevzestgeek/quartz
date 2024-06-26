import { app, BrowserWindow, shell } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
import { resolveHtmlPath } from "./util";
export default class AppUpdater {
  constructor() {
    log.transports.file.level = "info";
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === "production") {
  const sourceMapSupport = require("source-map-support");
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";

if (isDevelopment) {
  require("electron-debug")();
}

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ["REACT_DEVELOPER_TOOLS"];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  app.commandLine.appendSwitch("enable-features=OverlayScrollbar");
  const path = require("path");
  function getPlatformIcon() {
    if (process.platform === "win32") {
      return path.join(__dirname, "icons", "icon.ico"); // Windows
    } else if (process.platform === "darwin") {
      return path.join(__dirname, "icons", "icon.icns"); // macOS
    } else {
      return path.join(__dirname, "icons", "icon-512x512.png"); // Linux and others
    }
  }
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1020,
    frame: true,
    paintWhenInitiallyHidden: true,
    backgroundColor: "#080a0f",
    // show: false,
    title: "Myriade",
    autoHideMenuBar: true,
    resizable: true,
    icon: getPlatformIcon(),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(resolveHtmlPath("index.html"));
  app.on("ready", () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });
  process.on("uncaughtException", function (err) {
    console.log(err, "uncaught exceptions");
  });

  app.on("window-all-closed", () => {
    mainWindow = null;
  });

  //const menuBuilder = new MenuBuilder(mainWindow);
  //menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on("new-window", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
