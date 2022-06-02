const express = require("express");
const {
    getAll,
    getOne,
    create,
    update,
    deleteone
    
} = require("../controllers/OrderDetails");

const router = express.Router();


router.get("/", async function (req, res) {
    const allDetails = await getAll();
    res.json(allDetails);
});

router.get("/:id", async function (req, res) {
    const Details = await getOne(req.params.id);
    if (!Details) {
        res.status(404).send("order details not found");
    }
    res.status(200).json(seller);
});

router.post("/", async function (req, res) {
  var details= req.body;
    try {
        var orderdetails = await create(details);
        res.status(200).json(orderdetails);
    } catch (ex) {
        res.status(500).json(ex);
    }
});

router.patch("/:id", async function (req, res) {
    var details = req.body;
    var{id}=req.params;
    const orderdetails = await update(id,details);
    if (!orderdetails) {
        res.status(404).send(" not found");
    }
    res.status(200).send("order updated successfully")
    
});

router.delete("/:id", async function (req, res) {
    const orderdetailsId = req.params.id;
    const remove = await deleteone(orderdetailsId);
    if (!remove) {
        res.status(404).send("orderdetails was not found").end();
    }
    res.status(200).json(remove);
});


module.exports = router;
