import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LanguageService } from "../services/internationality/language.service";

@Component({
    selector: 'app-validation-error-show',
    templateUrl: './validation-error-show.component.html',
    styleUrls: ['./validation-error-show.component.scss']
})
export class ValidationErrorShowComponent {

    @Input() control: FormControl | FormGroup;
    @Input() showFirstOnly = true;
    @Input() set customErrorsMessages(customMessages: { [errorType: string]: (errorValue: any) => string }) {
        this.messages = { ...this.standartMessages, ...customMessages };
    }

    objectKeys = Object.keys;

    constructor(
        private langS: LanguageService
    ) { }

    standartMessages: { [errorType: string]: (errorValue?: any) => string } = {
        min: (errorValue: { min: 3, actual: 2 }) => {
            return this.langS.translate("minNumberError", [errorValue.min, errorValue.actual]);
        },
        max: (errorValue: { max: 15, actual: 16 }) => {
            return this.langS.translate("maxNumberError", [errorValue.max, errorValue.actual]);
        },
        required: () => {
            return this.langS.translate("requiredError");
        },
        email: () => {
            return this.langS.translate("invalidEmailError");
        },
        minlength: (errorValue: { requiredLength: number, actualLength: number }) => {
            return this.langS.translate("minLengthError", [errorValue.requiredLength, errorValue.actualLength]);
        },
        maxlength: (errorValue: { requiredLength: number, actualLength: number }) => {
            return this.langS.translate("maxLengthError", [errorValue.requiredLength, errorValue.actualLength]);
        },
        pattern: (errorValue: { requiredPattern: string, actualValue: string }) => {  // actualValue - текущее значение
            // if (requiredPattern === ...) return this.langS.translate("...");
            // else if (...) return this.langS.translate("...");
            return this.langS.translate("patternError", [errorValue.requiredPattern]);
        },



        phoneError: () => {
            return this.langS.translate("invalidPhoneError");
        },
        passwordConfirmError: () => {
            return this.langS.translate("passwordConfirmError");
        },
        trimError: () => {
            return this.langS.translate("trimError");
        },
        emailIsBusy: () => {
            return this.langS.translate("emailIsBusyError");
        },
        unknownError: () => {
            return this.langS.translate("unknownError");
        },
        invalidEmailOrPassword: () => {
            return this.langS.translate("invalidEmailOrPasswordError");
        },
        userIsBlock: () => {
            return this.langS.translate("userIsBlockError");
        },
        userNotIsActive: () => {
            return this.langS.translate("userNotIsActiveError");
        },
        messagesLimit: () => {
            return this.langS.translate("messagesLimitError");
        },
        invalidPassword: () => {
            return this.langS.translate("invalidPasswordError");
        },
        fileSizeError: (errorValue: { size: number, maxSize: number }) => {
            return this.langS.translate("fileSizeError", [errorValue.size, errorValue.maxSize]);
        }
    };

    messages = { ...this.standartMessages };

    getErrorText(errorName: string) {
        if (!(errorName in this.messages)) return this.messages.unknownError();
        else return this.messages[errorName](this.control.errors[errorName]);
    }
}
