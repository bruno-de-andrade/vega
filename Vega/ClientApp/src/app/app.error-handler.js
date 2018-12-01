"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppErrorHandler = /** @class */ (function () {
    function AppErrorHandler() {
    }
    //Should use inject because toasyService is initialized before the AppErrorHandler
    //constructor(
    //  private ngZone: NgZone,
    //  @Inject(ToastyService) private toastyService: ToastyService) {
    //}
    AppErrorHandler.prototype.handleError = function (error) {
        //if (!isDevMode())
        //  Sentry.captureException(error.originalError || error);
        //else
        throw error;
        //this.ngZone.run(() => {
        //  this.toastyService.error({
        //    title: 'Error',
        //    msg: 'An unexpected error happened.',
        //    theme: 'bootstrap',
        //    showClose: true,
        //    timeout: 5000
        //  });
        //});
    };
    return AppErrorHandler;
}());
exports.AppErrorHandler = AppErrorHandler;
//# sourceMappingURL=app.error-handler.js.map