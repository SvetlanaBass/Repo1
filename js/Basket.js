class Basket
{
    constructor(countGoods, amount, id){
        this.countGoods = countGoods;
        this.amount = amount;
        this.id = id;
    }

    render(root){
        let basketDiv = $('<div />', {
            id: this.id,
            text: 'Корзина'
        });

        let basketItemsDiv = $('<div />', {
            id: this.id + '_items'
        });

        basketItemsDiv.appendTo(basketDiv);
        basketDiv.appendTo(root);
        this.collectBasketItems();
    }

    add(product, quantity, price){
        this.countGoods += +quantity;
        this.amount += +price * +quantity;

        let $basketTable = $('#basket_table');
        let $tableTr = $('<tr />', {});
        $tableTr.append('<td class="id_product">' + product + '</td>');
        $tableTr.append('<td class="qty">' + quantity + '</td>');
        $tableTr.append('<td class="price">' + price + ' руб.</td>');
        $tableTr.append('<td><button class="delme">Удалить из корзины</button></td>');
        $tableTr.appendTo($basketTable);

        this.refresh();
    }

    refresh(){
        let $basketDataDiv = $('#basket_data');
        $basketDataDiv.empty();
        $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
        $basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');
    }

    collectBasketItems(){
        let appendId = '#' + this.id + '_items';

        $.get({
            url: './json/basket.json',
            dataType: 'json',
            success: function (data) {

                // Получаем и выводим начальные данные корзины
                let basketData = $('<div />', {
                    id: 'basket_data'
                });

                this.countGoods = data.basket.length;
                this.amount = data.amount;

                basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
                basketData.append('<p>Сумма: ' + this.amount + '</p>');

                basketData.appendTo(appendId);

                let basketTable = $('<table />', {
                    id: 'basket_table'
                });

                let tableTr = $('<tr />', {
                    id: 'basket_tr'
                });

                tableTr.append('<th>ID</th>');
                tableTr.append('<th>Quantity</th>');
                tableTr.append('<th>Price</th>');
                tableTr.append('<th>Action</th>');

                tableTr.appendTo(basketTable);
                basketTable.appendTo(appendId);

                for (let index in data.basket) {
                    let tableTr = $('<tr />', {});
                    tableTr.append('<td class="id_product">' + data.basket[index].id_product + '</td>');
                    tableTr.append('<td class="qty">' + data.basket[index].quantity + '</td>');
                    tableTr.append('<td class="price">' + data.basket[index].price + ' руб.</td>');
                    tableTr.append('<td><button class="delme">Удалить из корзины</button></td>');
                    tableTr.appendTo(basketTable);
                }
            },
            context: this
        });
    }

    delete(product, quantity, price){
        this.countGoods -= +quantity;
        this.amount -= +price * +quantity;

        this.refresh();
    }
}