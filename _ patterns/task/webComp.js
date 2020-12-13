

customElements.define('web-comp', class extends HTMLElement{
    connectedCallback(){
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        
        <style>
        .table-container {
            display: flex;
            
        }
        
        .table-equipment { 
            width: 40%;
            
        }

        .table-equipment-user { 
            width: 40%;
            
        }
        
        table{
            width: 100%;
            height: 312px;
        
            text-align: center;
        
            border: black solid 2px;
        }

        table tr {
            height: 100px;
        }
        
        table :first-child{
            width: 20%;
        }
        
         
        
        .arrows { 
            display: flex;
            height: 300px;
            width: 40px;
            padding: 5px;;
            
            display: flex; 
            flex-direction: column;
            justify-content: center;
        }
        
        .arrows svg{ 
            margin: 10px 0;
        }

        .myProgress {
            width: 100%;
            background-color: #eee;
          }
          
          .myBar {
            width: 1%;
            height: 30px;
            background-color: #4C00A0;
          }
</style>

<div class="table-container">
            <div class="table-equipment">
                <table>
                    <tr>
                        <td>
                            <input type="checkbox" name="" id="">
                        </td>
                        <td>1</td>
                        <td>1</td>
                    </tr>

                    <tr>
                        <td><input type="checkbox" name="" id=""></td>
                        <td>2</td>
                        <td>2</td>
                    </tr>

                    <tr>
                        <td><input type="checkbox" name="" id=""></td>
                        <td>3</td>
                        <td>3</td>
                    </tr>

                </table>
            </div>
            <div class="arrows">
                <svg class="left-arrow" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.867 477.867"
                    style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve">
                    <g>
                        <g>
                            <path d="M238.933,0C106.974,0,0,106.974,0,238.933s106.974,238.933,238.933,238.933s238.933-106.974,238.933-238.933
            S370.893,0,238.933,0z M320.357,403.926c-6.167,7.128-16.945,7.907-24.073,1.739c-0.17-0.147-0.337-0.298-0.501-0.451
            l-170.667-153.6c-7.003-6.309-7.566-17.1-1.258-24.103c0.397-0.441,0.817-0.861,1.258-1.258l170.667-153.6
            c6.879-6.444,17.679-6.092,24.123,0.787c6.444,6.879,6.092,17.679-0.787,24.123c-0.164,0.154-0.331,0.304-0.501,0.451
            L162.133,238.933l156.484,140.919C325.746,386.02,326.524,396.798,320.357,403.926z" />
                        </g>
                    </g>
                </svg>


                <svg class="right-arrow" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.867 477.867"
                    style="enable-background:new 0 0 477.867 477.867;" xml:space="preserve">
                    <g>
                        <g>
                            <path d="M238.933,0C106.974,0,0,106.974,0,238.933s106.974,238.933,238.933,238.933s238.933-106.974,238.933-238.933
			S370.893,0,238.933,0z M354.009,250.356c-0.397,0.441-0.817,0.861-1.258,1.258l-170.667,153.6
			c-7.128,6.167-17.906,5.389-24.073-1.739c-5.996-6.93-5.449-17.357,1.238-23.622l156.57-140.919L159.249,98.014
			c-6.879-6.444-7.231-17.244-0.787-24.123c6.265-6.687,16.693-7.234,23.622-1.238l170.667,153.6
			C359.754,232.561,360.317,243.353,354.009,250.356z" />
                        </g>
                    </g>

                </svg>

            </div>
            
                <div class="table-equipment-user">
                    <table>
                      

                    </table>
                </div>
            
        </div>

        

        <h1>Progress</h1>

        <div class="myProgress">
        <div class="myBar"></div>
        </div>
        
        `;
        
        var publisher = {

            subscribers: {
                defaultEvent: []
            },

            subscribe: function (fn, event){
                event = event || 'default';

                if(typeof this.subscribe[event] === 'undefined'){
                    this.subscribers[event] = [];
                }

                this.subscribers[event].push(fn);
            },

            publish: function (args, type) {
                this.visitSubscribers('publish', args, type);
            },

            unsubscribe: function (fn, type) {
                this.visitSubscribers('unsubscribe', fn, type);
            },

            visitSubscribers: function (action, arg, event) {
                var eventType = event || 'defaultEvent',
                    subscribers = this.subscribers[eventType],
                    i,
                    max = subscribers.length;

                for (i = 0; i < max; i++) {
                    if (action == 'publish') {
                      
                        subscribers[i](arg);
                    } else {
                       
                        if (subscribers[i] === arg) {
                            subscribers.splice(i, 1);
                        }
                    }
                }
            }

        }

        function makePublicsher(obj) {
            var i;
            for (i in publisher) {
                if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
                    obj[i] = publisher[i];
                }
            }

            obj.subscribers = { any: [] };
        }




        
        var carrier = {
            carrier: function(direction){
                if(direction == 'right'){
                    setTimeout(rightCarrier, 1000);
                    this.publish('123', 'click');
                } else {
                    setTimeout(leftCarrier, 1000);
                    this.publish('abc', 'doubleClick');
                }
        } 
        };

        makePublicsher(carrier);
        var elem = this.shadowRoot.querySelector(".myBar"); // нужна привзяка контекста или что ? 
        

        var handlerObject = {
            
           handler2: function move() {
            var i = 0;
            if (i == 0) {
                i = 1;
                
                var width = 1;
                var id = setInterval(frame, 10);
                function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width++;
                    elem.style.width = width + "%";
                }
               
                }
               
            }
            
            }
        }

        carrier.subscribe(handlerObject.handler2, 'click');
        carrier.subscribe(handlerObject.handler2, 'doubleClick');

        
       



         let rightCarrier = () => {
            let checkboxArr = this.shadowRoot.querySelectorAll('input[type="checkbox"]');
            let userSelect = this.shadowRoot.querySelector('.table-equipment-user');
           

              for(let elem of checkboxArr){
                if(elem.checked) userSelect.firstElementChild.append(elem.parentNode.parentNode);
            } //если перенос  

           /*  for(let elem of checkboxArr){
                if(elem.checked) userSelect.firstElementChild.append(elem.parentNode.parentNode.cloneNode(true));
            }  */
        };


        let leftCarrier = () => {
            let checkboxArr = this.shadowRoot.querySelectorAll('input[type="checkbox"]');
            let userSelect = this.shadowRoot.querySelector('.table-equipment');
           

              for(let elem of checkboxArr){
                if(elem.checked) userSelect.firstElementChild.append(elem.parentNode.parentNode);
            } //если перенос 

           /*  for(let elem of checkboxArr){
                if(elem.checked) userSelect.firstElementChild.append(elem.parentNode.parentNode.cloneNode(true));
            }  */
        }; 

        
        this.shadowRoot.querySelector('.right-arrow').addEventListener("click", (e) => {
                
                
               carrier.carrier('right'); 
                
            });

            this.shadowRoot.querySelector('.left-arrow').addEventListener("click", (e) => {
                
                
                carrier.carrier('left'); 
                 
             });
           /*  this.shadowRoot.querySelector('.cancelComponent').addEventListener("click", () => {
                
                tooltip(false); 
                
            });
        
              if(this.getAttribute('tool_background')){
                this.shadowRoot.querySelector('.tooltip-text').style.background = this.getAttribute('tool_background');
        
            }if(this.getAttribute('tool_color')){
                this.shadowRoot.querySelector('.tooltip-text').style.color = this.getAttribute('tool_color');
         }  */
        }   
          

        
});