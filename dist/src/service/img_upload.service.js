"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
function uploadMedia() {
    return __awaiter(this, void 0, void 0, function* () {
        const form = new form_data_1.default();
        const image_srm = fs_1.default.readFileSync(`src/images/whatsappicon.png`);
        form.append('file', image_srm, {
            filename: 'your-file-name.ext',
            contentType: 'your-mime-type'
        });
        form.append('type', 'image/jpeg');
        let headers = form.getHeaders();
        console.log('');
        try {
            const response = yield axios_1.default.post('https://graph.facebook.com/v20.0/your_phone_number_id/media', form, {
                headers: Object.assign({ 'Authorization': process.env.TOKEN }, headers)
            });
            return response.data.id;
        }
        catch (error) {
            console.error('Error uploading media:', error);
            throw error;
        }
    });
}
exports.uploadMedia = uploadMedia;
