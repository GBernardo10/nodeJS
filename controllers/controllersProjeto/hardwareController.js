"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
class HardwareController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield database_1.default.query `select * from HARDWARE, MAQUINA, userSeven
        where HARDWARE.fk_idsoft=maquina.id_soft and maquina.fk_idusuario = userSeven.id_usuario
        and userSeven.id_usuario = ${id} `.then(resultado => {
                if (resultado.recordset.length > 0) {
                    res.json(resultado.recordset);
                    console.log(resultado.recordsets);
                }
                else {
                    res.status(404).json({
                        text: "Nenhum registro encontrado"
                    });
                }
            });
        });
    }
    ;
    getUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query `select * from desempenho where idHardware = ${id}`.then(resultado => {
                if (resultado.recordset.length > 0) {
                    return res.json(resultado.recordset[0]);
                }
                else {
                    res.status(404).json({
                        text: "Usuario nao encontrado"
                    });
                }
            });
        });
    }
}
const hardwareController = new HardwareController();
exports.default = hardwareController;
