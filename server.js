const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");

app.use(express.json());
app.use(cors());
app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]], // 작성시간 기준으로 정렬
    attributes: ["id", "name", "price", "seller", "createdAt", "imageUrl"], // 이 이외의 정보는 받지 않겠음
  })
    .then((result) => {
      console.log("Product :", result);
      res.send({
        products: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러발생");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, price, description, seller } = body;

  if (!name || !description || !price || !seller) {
    res.send("모든 항목을 작성해주세요.");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("상품 생성 결과 :", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.error("error");
      res.send("상품 업로드 에러 발생");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("상품: ", result);
      res.send({
        product: {
          result,
        },
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("에러발생");
    });
});

app.listen(port, () => {
  models.sequelize
    .sync()
    .then(() => {
      console.log("db 연걸 성공");
    })
    .catch((err) => {
      console.err(err);
      console.log("error");
      process.exit;
    });
  console.log("jins market server on");
});
