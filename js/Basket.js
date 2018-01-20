class Basket
{
    constructor(countGoods, amount, basketItems, id){
        this.countGoods = countGoods;
        this.amount = amount;
        this.basketItems = basketItems;
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
        let basketItems = {
            "id_product": product,
            "price": price
        };

        this.countGoods += +quantity;
        this.amount += +price * +quantity;

        this.basketItems.push(basketItems);
        this.refresh();
    }

    refresh(){
        let $basketDataDiv = $('#basket_data');
        $basketDataDiv.empty();
        $basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + '</p>');
        $basketDataDiv.append('<p>Сумма: ' + this.amount + '</p>');
        $basketDataDiv.append('<table>')

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

                for (let index in data.basket) {
                    this.basketItems.push(data.basket[index]);
                }
            },
            context: this
        });
    }

    delete(product, price){
        let basketItems = {
            "id_product": product,
            "price": price
        };

        this.countGoods -= 1;
        this.amount -= +price;

        this.basketItems.pop(basketItems);
        this.refresh();
    }
}