const express = require("express");
const {
    getAll,
    getOne,
    create,
    update,
    deleteone
    
} = require("../controllers/UserOrder");

const router = express.Router();


router.get("/", async function (req, res) {
    const allDetails = await getAll();
    res.json(allDetails);
});

router.get("/:id", async function (req, res) {
    const Details = await getOne(req.params.id);
    if (!Details) {
        res.status(404).send("user order not found");
    }
    res.status(200).json(seller);
});

router.post("/", async function (req, res) {
  var userorder= req.body;
    try {
        var userorderdetails = await create(userorder);
        res.status(200).json(userorderdetails);
    } catch (ex) {
        res.status(500).json(ex);
    }
});

router.patch("/:id", async function (req, res) {
    var userorder = req.body;
    var{id}=req.params;
    const userorderdetails = await update(id,userorder);
    if (!userorderdetails) {
        res.status(404).send(" not found");
    }
    res.status(200).send("user order updated successfully")
    
});

router.delete("/:id", async function (req, res) {
    const userorderdetailsId = req.params.id;
    const remove = await deleteone(userorderdetailsId);
    if (!remove) {
        res.status(404).send("user order was not found").end();
    }
    res.status(200).json(remove);
});


module.exports = router;
