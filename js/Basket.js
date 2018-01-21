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
        let $TableTr = $('<tr />', {});
        $TableTr.append('<td class="id_product">' + product + '</td>');
        $TableTr.append('<td class="qty">' + quantity + '</td>');
        $TableTr.append('<td class="price">' + price + ' руб.</td>');
        $TableTr.append('<td><button class="delme">Удалить из корзины</button></td>');
        $TableTr.appendTo($basketTable);

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

                let TableTr = $('<tr />', {
                    id: 'basket_tr'
                });

                TableTr.append('<th>ID</th>');
                TableTr.append('<th>Quantity</th>');
                TableTr.append('<th>Price</th>');
                TableTr.append('<th>Action</th>');

                TableTr.appendTo(basketTable);
                basketTable.appendTo(appendId);

                for (let index in data.basket) {
                    let TableTr = $('<tr />', {});
                    TableTr.append('<td class="id_product">' + data.basket[index].id_product + '</td>');
                    TableTr.append('<td class="qty">' + data.basket[index].quantity + '</td>');
                    TableTr.append('<td class="price">' + data.basket[index].price + ' руб.</td>');
                    TableTr.append('<td><button class="delme">Удалить из корзины</button></td>');
                    TableTr.appendTo(basketTable);
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