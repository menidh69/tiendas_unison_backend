const Usuario = require('../../models/Usuario');
const Openpay_customer = require('../../models/Openpay_customer')


router.post('/api/v2/openpay/savecard', savecard, async (req, res)=> {
    await Usuario.findOne ({
        where:{
            id: req.body.user_id
        }
    })
    .then(async user => {
        console.log(user)
        
        var customerRequest = {
            'name': user.nombre,
            'email': user.email,
            'requires_account': false
        };
        
        openpay.customers.create(customerRequest, function(error, customer) {
            // ...
            try {

                var cardRequest = {
                'token_id' : req.body.token_id,
                'device_session_id' : req.body.device_session_id
                }
                  
                openpay.customers.cards.create(customer.id, cardRequest, function(error, card)  {
                // ...
                try {
                    var customer_openpay = {
                        'id_usuario': user.id,
                        'customer_id': customer.id,
                        'card_id': card.id
                    }

                    Openpay_customer.create(customer_openpay, function(error, cuenta) {
                        res.json({"Mensaje": cuenta})
                    })
                    
                } catch (error) {
                    res.json(error)
                }
                });
                
            } catch (error) {
                res.json(error)
            }
        });

        res.json({"datos": user})
    })
    .catch(err=>{
        console.log(err)
        res.json({"error": err})
    });

});

