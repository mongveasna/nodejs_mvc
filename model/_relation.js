module.exports = function (models) {
    // const {
    //     Auth,
    //     AuthSecurity,
    //     AuthToken,
    //     Fee,
    //     Journal,
    //     JournalItem,
    //     NumberRange,
    //     Profile,
    //     Transaction,
    //     TransactionType,
    //     TransactionTypeFee,
    //     Wallet,
    //     WalletLog,
    //     WalletType,
    //     WalletTypePermission
    // } = models;

    // Wallet.hasMany(Fee, { foreignKey: 'third_party_wallet_number', sourceKey: 'wallet_number' });
    // Fee.belongsTo(Wallet, { foreignKey: 'third_party_wallet_number', targetKey: 'wallet_number' });

    // NumberRange.hasMany(Journal, { foreignKey: 'number_range_code', sourceKey: 'code' });
    // Journal.belongsTo(NumberRange, { foreignKey: 'number_range_code', targetKey: 'code' });

    // Transaction.hasMany(Journal, { foreignKey: 'transaction_number', sourceKey: 'transaction_number' });
    // Journal.belongsTo(Transaction, { foreignKey: 'transaction_number', targetKey: 'transaction_number' });

    // Transaction.hasMany(Journal, { foreignKey: 'transaction_uuid', sourceKey: 'transaction_uuid' });
    // Journal.belongsTo(Transaction, { foreignKey: 'transaction_uuid', targetKey: 'transaction_uuid' });

    // TransactionType.hasMany(Journal, { foreignKey: 'transaction_type_code', sourceKey: 'code' });
    // Journal.belongsTo(TransactionType, { foreignKey: 'transaction_type_code', targetKey: 'code' });

    // Wallet.hasMany(Journal, { foreignKey: 'transaction_wallet_number_from', sourceKey: 'wallet_number' });
    // Journal.belongsTo(Wallet, { foreignKey: 'transaction_wallet_number_from', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(Journal, { foreignKey: 'transaction_wallet_number_to', sourceKey: 'wallet_number' });
    // Journal.belongsTo(Wallet, { foreignKey: 'transaction_wallet_number_to', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(Journal, { foreignKey: 'holder_wallet_number', sourceKey: 'wallet_number' });
    // Journal.belongsTo(Wallet, { foreignKey: 'holder_wallet_number', targetKey: 'wallet_number' });
    
    // Journal.hasMany(JournalItem, { foreignKey: 'journal_number', sourceKey: 'journal_number' });
    // JournalItem.belongsTo(Journal, { foreignKey: 'journal_number', targetKey: 'journal_number' });
    
    // Journal.hasMany(JournalItem, { foreignKey: 'journal_uuid', sourceKey: 'journal_uuid' });
    // JournalItem.belongsTo(Journal, { foreignKey: 'journal_uuid', targetKey: 'journal_uuid' });

    // Transaction.hasMany(JournalItem, { foreignKey: 'transaction_number', sourceKey: 'transaction_number' });
    // JournalItem.belongsTo(Transaction, { foreignKey: 'transaction_number', targetKey: 'transaction_number' });
    
    // Transaction.hasMany(JournalItem, { foreignKey: 'transaction_uuid', sourceKey: 'transaction_uuid' });
    // JournalItem.belongsTo(Transaction, { foreignKey: 'transaction_uuid', targetKey: 'transaction_uuid' });
    
    // Wallet.hasMany(JournalItem, { foreignKey: 'transaction_wallet_number_from', sourceKey: 'wallet_number' });
    // JournalItem.belongsTo(Wallet, { foreignKey: 'transaction_wallet_number_from', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(JournalItem, { foreignKey: 'transaction_wallet_number_to', sourceKey: 'wallet_number' });
    // JournalItem.belongsTo(Wallet, { foreignKey: 'transaction_wallet_number_to', targetKey: 'wallet_number' });
    
    // Fee.hasMany(JournalItem, { foreignKey: 'fee_code', sourceKey: 'code' });
    // JournalItem.belongsTo(Fee, { foreignKey: 'fee_code', targetKey: 'code' });
    
    // Wallet.hasMany(JournalItem, { foreignKey: 'fee_third_party_wallet_number', sourceKey: 'wallet_number' });
    // JournalItem.belongsTo(Wallet, { foreignKey: 'fee_third_party_wallet_number', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(JournalItem, { foreignKey: 'wallet_number_from', sourceKey: 'wallet_number' });
    // JournalItem.belongsTo(Wallet, { foreignKey: 'wallet_number_from', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(JournalItem, { foreignKey: 'wallet_number_to', sourceKey: 'wallet_number' });
    // JournalItem.belongsTo(Wallet, { foreignKey: 'wallet_number_to', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(JournalItem, { foreignKey: 'holder_wallet_number', sourceKey: 'wallet_number' });
    // JournalItem.belongsTo(Wallet, { foreignKey: 'holder_wallet_number', targetKey: 'wallet_number' });
    
    // TransactionType.hasMany(Transaction, { foreignKey: 'transaction_type_code', sourceKey: 'code' });
    // Transaction.belongsTo(TransactionType, { foreignKey: 'transaction_type_code', targetKey: 'code' });
    
    // NumberRange.hasMany(Transaction, { foreignKey: 'number_range_code', sourceKey: 'code' });
    // Transaction.belongsTo(NumberRange, { foreignKey: 'number_range_code', targetKey: 'code' });
    
    // Wallet.hasMany(Transaction, { foreignKey: 'wallet_number_from', sourceKey: 'wallet_number' });
    // Transaction.belongsTo(Wallet, { foreignKey: 'wallet_number_from', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(Transaction, { foreignKey: 'wallet_number_to', sourceKey: 'wallet_number' });
    // Transaction.belongsTo(Wallet, { foreignKey: 'wallet_number_to', targetKey: 'wallet_number' });
    
    // Wallet.hasMany(Transaction, { foreignKey: 'holder_number_to', sourceKey: 'wallet_number' });
    // Transaction.belongsTo(Wallet, { foreignKey: 'holder_number_to', targetKey: 'wallet_number' });
    
    // NumberRange.hasMany(TransactionType, { foreignKey: 'transaction_number_range_code', sourceKey: 'code' });
    // TransactionType.belongsTo(NumberRange, { foreignKey: 'transaction_number_range_code', targetKey: 'code' });
    
    // NumberRange.hasMany(TransactionType, { foreignKey: 'journal_number_range_code', sourceKey: 'code' });
    // TransactionType.belongsTo(NumberRange, { foreignKey: 'journal_number_range_code', targetKey: 'code' });
    
    // Wallet.hasMany(TransactionType, { foreignKey: 'holder_wallet_number', sourceKey: 'wallet_number' });
    // TransactionType.belongsTo(Wallet, { foreignKey: 'holder_wallet_number', targetKey: 'wallet_number' });
    
    // TransactionType.hasMany(TransactionTypeFee, { foreignKey: 'transaction_type_code', sourceKey: 'code' });
    // TransactionTypeFee.belongsTo(TransactionType, { foreignKey: 'transaction_type_code', targetKey: 'code' });
    
    // Fee.hasMany(TransactionTypeFee, { foreignKey: 'fee_code', sourceKey: 'code' });
    // TransactionTypeFee.belongsTo(Fee, { foreignKey: 'fee_code', targetKey: 'code' });

    // WalletType.hasMany(Wallet, { foreignKey: 'wallet_type_code', sourceKey: 'code' });
    // Wallet.belongsTo(WalletType, { foreignKey: 'wallet_type_code', targetKey: 'code' });

    // Wallet.hasMany(WalletLog, { foreignKey: 'wallet_number', sourceKey: 'wallet_number' });
    // WalletLog.belongsTo(Wallet, { foreignKey: 'wallet_number', targetKey: 'wallet_number' });

    // Transaction.hasMany(WalletLog, { foreignKey: 'transaction_number', sourceKey: 'transaction_number' });
    // WalletLog.belongsTo(Transaction, { foreignKey: 'transaction_number', targetKey: 'transaction_number' });

    // Transaction.hasMany(WalletLog, { foreignKey: 'transaction_uuid', sourceKey: 'transaction_uuid' });
    // WalletLog.belongsTo(Transaction, { foreignKey: 'transaction_uuid', targetKey: 'transaction_uuid' });

    // Journal.hasMany(WalletLog, { foreignKey: 'journal_number', sourceKey: 'journal_number' });
    // WalletLog.belongsTo(Journal, { foreignKey: 'journal_number', targetKey: 'journal_number' });

    // Journal.hasMany(WalletLog, { foreignKey: 'journal_uuid', sourceKey: 'journal_uuid' });
    // WalletLog.belongsTo(Journal, { foreignKey: 'journal_uuid', targetKey: 'journal_uuid' });

    // Journal.hasMany(JournalItem, { foreignKey: 'journal_item_uuid', sourceKey: 'journal_uuid' });
    // JournalItem.belongsTo(Journal, { foreignKey: 'journal_item_uuid', targetKey: 'journal_uuid' });

    // WalletType.hasMany(WalletTypePermission, { foreignKey: 'wallet_type_code', sourceKey: 'code' });
    // WalletTypePermission.belongsTo(WalletType, { foreignKey: 'wallet_type_code', targetKey: 'code' });

};