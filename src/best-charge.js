function bestCharge(selectedItems) {
  var allItems = loadAllItems();
  var promotions =loadPromotions();
  var cartItems = buildItems(selectedItems);
  var youhui1 = promotion1(cartItems,allItems);
  var youhui2 = promotion2(cartItems,promotions);
  var receipt = seletedPro(youhui1,youhui2,cartItems,allItems);
  return receipt;

}
//购物车商品参数及数量
function buildItems(selectedItems) {
  var cartItems = [];
  var allItems = loadAllItems();

  for(const selectedItem of selectedItems) {
    const selectedItemArray = selectedItem.split(' x ');
    const id = selectedItemArray[0];
    const count = parseInt(selectedItemArray[1]);
    const item = allItems.find(function (arg) {
      return arg.id === id;
    })
    cartItems.push({item, count});
  }
  return cartItems;
}

//满30-6
function promotion1(cartItems,allItems) {
  var total1=0;
  for(var i=0;i<cartItems.length;i++) {
    for (var j = 0; j < allItems.length; j++) {
      if (cartItems[i].item.id === allItems[j].id)
        total1 += cartItems[i].count * allItems[j].price;
    }
  }
    if(total1>=30){
      return total1 -= 6;
    }
}

//半价优惠
function  promotion2(cartItems,promotions,allItems) {
  var promotions1 = loadPromotions();
  for(var m=0;m<cartItems.length;m++) {
    for(var n=0;n<promotions1[1].items.length;n++) {
      if(cartItems[m].item.id === promotions1[1].items[n]) {
        cartItems[m].item.price *= 1/2;
      }
    }
  }
  var total2 = 0;
  for(var p=0;p<cartItems.length;p++) {
    total2 += cartItems[p].count * cartItems[p].item.price;
  }
  return total2;
}

function save(pro2,cartItems,allItems) {
  var save1 = 0;
  for(var m =0;m<cartItems.length;m++) {
    for(var n=0;n<allItems.length;n++) {
      if(cartItems[m].item.id === allItems[n].id) {
        save1 += allItems[n].price * cartItems[m].count;
      }
    }
  }
  return save1 - pro2;
}

//比较优惠
function  seletedPro(pro1,pro2,cartItems,allItems) {
  var str = "============= 订餐明细 =============";
  for(var i=0;i<cartItems.length;i++) {
    for(var j=0;j<allItems.length;j++) {
      if(cartItems[i].item.id === allItems[j].id) {
        str += "\n" + allItems[j].name + " x " + cartItems[i].count + " = " + cartItems[i].count*allItems[j].price + "元";
      }
    }
  }
  str += "\n-----------------------------------\n";
  if(pro1 <= pro2) {
    str += "使用优惠:\n" + "满30减6元，省6元\n" + "-----------------------------------\n" + "总计：" +pro1 + "元";
  }
  else if (pro1 > pro2) {
    str += "使用优惠:\n" + "指定菜品半价(黄焖鸡，凉皮)，省" +save(pro2,cartItems,allItems)+ "元\n" + "-----------------------------------\n" + "总计：" + pro2 +"元";
  }
  else str += "总计：" + pro2 + "元";
  str += "\n===================================\n";
  return str;
}
