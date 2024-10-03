let accounts = require("../../accounts");

// const id = accounts[accounts.length - 1].id + 1;
// const newAccount = { ...req.body, funds: 0, id };
exports.accountCreate = async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const deletedAccount = await Account.findByIdAndDelete(accountId);
    
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    
    res.status(204).end();
  } catch (error) {
    // Respond with 204 status code on error
    res.status(204).end();
  }
};


exports.accountUpdate = async(req, res,next) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findByIdAndUpdate(accountId, req.body, { new: true });

    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(204).json(foundAccount);
    
  } catch (error) {
    
  }
}
//   const { accountId } = req.params;
//   const foundAccount = accounts.find((account) => account.id === +accountId);
//   if (foundAccount) {
//     foundAccount.funds = req.body.funds;
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: "Account not found" });
//   }
// };

exports.accountsGet = (req, res) => {
  res.json(accounts);
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
