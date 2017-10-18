process.env.NODE_ENV = 'testing';

const { sequelize, isReady } = require("../lib/model");
const { sleep } = require("../lib/common");
const logger = require("../lib/logger")("test/_init");

describe("Get Setup Data", function() {
    it("success to Clear data", async function() {
        this.timeout(30000);
        while(!isReady()) { 
            logger.info("waiting model ... ");  
            await sleep(1000);
        }
        const sqlFee = `
INSERT INTO "Fee" ("code", "name", "target", "third_party_wallet_number", "factor", "value", "created_at", "updated_at")
VALUES
	('TRANSFER_REMAINING','Transfer remaining amount','RECIPIENT',NULL,'DEBIT_REMAINING',0.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('ZOOM_AGENT_FEE_LVL1','Fee for Agent for cashing out','SENDER',NULL,'DEBIT_FIX',1.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('ZOOM_FEE_LVL1','Fee for ZOOM','THIRD_PARTY',3000005,'DEBIT_FIX',1.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('ZOOM_FEE_LVL2','Fee for ZOOM','THIRD_PARTY',3000005,'DEBIT_FIX',2.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('ZOOM_FEE_LVL3','Fee for ZOOM','THIRD_PARTY',3000005,'DEBIT_FIX',3.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('ZOOM_OWNER_FEE_LVL1','Fee for ZOOM','THIRD_PARTY',3000005,'DEBIT_FIX',1.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00');
`;

        const sqlNumberRange = `
INSERT INTO "NumberRange" ("code", "lower", "upper", "step", "current", "created_at", "updated_at")
VALUES
	('WLT_AGENT',1000000,1999999,1,1000000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_JOURNAL',900000000,999999999,1,900000015,'2017-07-04 15:06:35.677 +00:00','2017-07-03 03:44:37'),
	('WLT_TRANSFER_TRANSACTION',100000000,399999999,1,100000012,'2017-07-04 15:06:35.677 +00:00','2017-07-03 03:31:37'),
	('WLT_USER',3000000,9999999,1,3000006,'2017-07-04 15:06:35.677 +00:00','2017-06-28 10:50:17');
`;

        const sqlTransactionType = `
INSERT INTO "TransactionType" ("code", "level", "transaction_number_range_code", "journal_number_range_code", "name", "type", "permission_code", "require_approval", "default_status", "holder_wallet_number", "amount_lower", "amount_upper", "created_at", "updated_at")
VALUES
	('WLT_CASHOUT_A2A',1,'WLT_TRANSFER_TRANSACTION','WLT_TRANSFER_JOURNAL','ZOOM Money Transfer','A2A','CASHOUT',true,'PENDING',3000004,5.000,1000.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',1,'WLT_TRANSFER_TRANSACTION','WLT_TRANSFER_JOURNAL','ZOOM Money Transfer','A2A','TRANSFER',false,'ACCEPTED',NULL,5.000,100.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',2,'WLT_TRANSFER_TRANSACTION','WLT_TRANSFER_JOURNAL','ZOOM Money Transfer','A2A','TRANSFER',false,'ACCEPTED',NULL,100.001,500.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',3,'WLT_TRANSFER_TRANSACTION','WLT_TRANSFER_JOURNAL','ZOOM Money Transfer','A2A','TRANSFER',false,'ACCEPTED',NULL,500.001,1000.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_ZOOM_FREE_TRANSFER_A2A',1,'WLT_TRANSFER_TRANSACTION','WLT_TRANSFER_JOURNAL','ZOOM Master Free Transfer','A2A','TRANSFER',false,'ACCEPTED',NULL,5.000,1000.000,'2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00');
`;

        const sqlTransactionTypeFee = `
INSERT INTO "TransactionTypeFee" ("transaction_type_code", "level", "seq", "fee_code", "valid_to", "valid_from", "created_at", "updated_at")
VALUES
	('WLT_CASHOUT_A2A',1,3,'TRANSFER_REMAINING','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_CASHOUT_A2A',1,1,'ZOOM_AGENT_FEE_LVL1','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_CASHOUT_A2A',1,2,'ZOOM_OWNER_FEE_LVL1','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',1,2,'TRANSFER_REMAINING','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',1,1,'ZOOM_FEE_LVL1','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',2,2,'TRANSFER_REMAINING','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',2,1,'ZOOM_FEE_LVL2','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',3,2,'TRANSFER_REMAINING','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_TRANSFER_A2A',3,1,'ZOOM_FEE_LVL3','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_ZOOM_FREE_TRANSFER_A2A',1,1,'TRANSFER_REMAINING','2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00');
`;

        const sqlWallet = `
INSERT INTO "Wallet" ("wallet_number", "wallet_number_uuid", "wallet_group", "wallet_type_code", "balance", "created_at", "updated_at")
VALUES
	(3000001,'82d5e1f0-5bdb-11e7-89f8-11be4bef7da0','WALLET','WLT_USER',1000.000,'2017-06-28 08:26:40','2017-07-03 03:44:37'),
	(3000002,'8360bcd0-5bdb-11e7-89f8-11be4bef7da0','WALLET','WLT_USER',0.000,'2017-06-28 08:26:41','2017-07-03 03:44:37'),
	(3000003,'83a7b0e0-5bdb-11e7-89f8-11be4bef7da0','WALLET','WLT_AGENT',0.000,'2017-06-28 08:26:42','2017-06-28 08:26:42'),
	(3000004,'83e8b180-5bdb-11e7-89f8-11be4bef7da0','WALLET','WLT_MASTER_HOLDER',0.000,'2017-06-28 08:26:42','2017-06-28 10:41:33'),
	(3000005,'bfa0f920-5bdc-11e7-be81-4f5fd155c1e6','WALLET','WLT_MASTER',0.000,'2017-06-28 08:35:32','2017-07-03 03:44:37');

`;

        const sqlWalletType = `
INSERT INTO "WalletType" ("code", "name", "wallet_group", "created_at", "updated_at")
VALUES
	('WLT_AGENT','Agent Account','WALLET','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_MASTER','ZOOOM Master Account','WALLET','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_MASTER_HOLDER','ZOOM Master Non-user Holder Account','WALLET','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_MERCHANT','Merchant Account','WALLET','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_USER','User Account','WALLET','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00');
`;
        

        const sqlWalletTypePermission = `
INSERT INTO "WalletTypePermission" ("wallet_type_code", "permission_code", "sender", "holder", "approver", "receiver", "valid_to", "valid_from", "created_at", "updated_at")
VALUES
	('WLT_AGENT','CASHOUT',false,false,true,true,'2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_MASTER','TRANSFER',false,false,false,true,'2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_MASTER_HOLDER','CASHOUT',false,true,false,false,'2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_USER','TRANSFER',true,false,false,true,'2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00'),
	('WLT_USER','CASHOUT',true,false,false,false,'2020-12-31 23:59:59','2017-01-01 00:00:00','2017-07-04 15:06:35.677 +00:00','2017-07-04 15:06:35.677 +00:00');
`;
        await sequelize.query(sqlFee);
        await sequelize.query(sqlNumberRange);
        await sequelize.query(sqlTransactionType);
        await sequelize.query(sqlTransactionTypeFee);
        await sequelize.query(sqlWallet);
        await sequelize.query(sqlWalletType);
        await sequelize.query(sqlWalletTypePermission);
    });
});
