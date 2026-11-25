
function isRelevant(client) {
    return !client.specialWindow;
}

function moveAllWindowsToScreen(screen) {
    if (screen>workspace.screens.length-1) return;
    var allClients = workspace.windowList();   // was clientList in v5
    var relevantClients = allClients.filter(function(client) {
        return isRelevant(client);
    });

    for (var i = 0; i < relevantClients.length; ++i) {
        var client = relevantClients[i];
        // sendClientToScreen does nothing to a maximized window (seen on Plasma 6.7),
        // so unmaximize, move, then restore the same maximize mode.
        var max = client.maximizeMode;   // 0 none, 1 vertical, 2 horizontal, 3 full
        if (max) client.setMaximize(false, false);
        workspace.sendClientToScreen(client, workspace.screens[screen]);   // was just screen number in v5
        if (max) client.setMaximize((max & 1) != 0, (max & 2) != 0);
    }
}

function moveAllTo0() {moveAllWindowsToScreen(0)}
function moveAllTo1() {moveAllWindowsToScreen(1)}
function moveAllTo2() {moveAllWindowsToScreen(2)}
function moveAllTo3() {moveAllWindowsToScreen(3)}
registerShortcut("Move All Windows To Screen 0", "Move All Windows To Screen 0", "", moveAllTo0);
registerShortcut("Move All Windows To Screen 1", "Move All Windows To Screen 1", "", moveAllTo1);
registerShortcut("Move All Windows To Screen 2", "Move All Windows To Screen 2", "", moveAllTo2);
registerShortcut("Move All Windows To Screen 3", "Move All Windows To Screen 3", "", moveAllTo3);
