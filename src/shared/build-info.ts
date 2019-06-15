declare var WASGEIT_BUILD_COMMIT: string
declare var WASGEIT_BUILD_TIME: string

// These will be replaced by Webpack's DefinePlugin
export var buildInfo = {
    commit: WASGEIT_BUILD_COMMIT,
    time: WASGEIT_BUILD_TIME
}
