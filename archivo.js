// archivo.js
import { default as makeWASocket, useMultiFileAuthState, DisconnectReason } from '@adiwajshing/baileys';
import qrcode from 'qrcode-terminal';
import readline from 'readline';
import { NUMERO, BOT_NAME } from './config.js';
import { handleMessage } from './handler.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.clear();
console.log(`\n===== ${BOT_NAME} =====`);
console.log('1️⃣  Escanear QR para vincular WhatsApp');
console.log('2️⃣  Usar sesión de número ya vinculado\n');

rl.question('Selecciona una opción (1 o 2): ', (opcion) => {
    if (opcion === '1') {
        startBot({ modoQR: true });
    } else if (opcion === '2') {
        startBot({ modoQR: false });
    } else {
        console.log('❌ Opción inválida. Saliendo...');
        rl.close();
        process.exit(0);
    }
});

async function startBot({ modoQR }) {
    rl.close();
    const { state, saveCreds } = await useMultiFileAuthState(`auth/${NUMERO}`);

    const client = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    client.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (modoQR && qr) {
            console.log('\n🔑 Escanea este QR con WhatsApp:\n');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'open') {
            console.log(`✅ ${BOT_NAME} conectado correctamente al número ${NUMERO}`);
        }

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log(`❌ Conexión cerrada para ${NUMERO}:`, reason);

            if (reason !== DisconnectReason.loggedOut) {
                console.log('🔄 Reconectando...');
                startBot({ modoQR });
            } else {
                console.log(`⚠️ Sesión de ${NUMERO} cerrada permanentemente. Escanea QR de nuevo.`);
            }
        }
    });

    // Escuchar mensajes
    client.ev.on('messages.upsert', async (m) => {
        for (const msg of m.messages) {
            handleMessage(msg);
        }
    });

    client.ev.on('creds.update', saveCreds);
}

