new Vue({
    el: "#app",
    data() {
        return {
            logList: "",
            current: "",
            answer: "",
            operatorClicked: true
        };
    },
    methods: {
        append(number) {
            if (this.operatorClicked) {
                this.current = "";
                this.operatorClicked = false;
            }
            this.animateNumber(`n${number}`);
            var checknum = 0;
            if(number === '10%'){
                checknum = this.logList.substr(0,this.logList.length-2) * 0.1;
            }else if(number === '20%'){
                checknum = this.logList.substr(0,this.logList.length-2) * 0.2;
            }else if(number === '30%'){
                checknum = this.logList.substr(0,this.logList.length-2) * 0.3;
            }else if(number === '40%'){
                checknum = this.logList.substr(0,this.logList.length-2) * 0.4;
            }else if(number === '50%'){
                checknum = this.logList.substr(0,this.logList.length-2) * 0.5;
            }else if(number === '60%'){
                checknum = this.logList.substr(0,this.logList.length-2) * 0.6;
            }else{
                checknum = number;
            }
            this.current = `${this.current}${checknum}`;
        },
        addtoLog(operator) {
            if (this.operatorClicked == false) {
                this.logList += `${this.current} ${operator} `;
                this.current = "";
                this.operatorClicked = true;
            }
        },
        animateNumber(number) {
            let tl = anime.timeline({
                targets: `#${number}`,
                duration: 250,
                easing: "easeInOutCubic"
            });
            tl.add({ backgroundColor: "#c1e3ff" });
            tl.add({ backgroundColor: "#f4faff" });
        },
        animateOperator(operator) {
            let tl = anime.timeline({
                targets: `#${operator}`,
                duration: 250,
                easing: "easeInOutCubic"
            });
            tl.add({ backgroundColor: "#a6daff" });
            tl.add({ backgroundColor: "#d9efff" });
        },
        clear() {
            this.animateOperator("clear");
            this.current = "";
            this.answer = "";
            this.logList = "";
            this.operatorClicked = false;
        },
        sign() {
            this.animateOperator("sign");
            if (this.current != "") {
                this.current =
                    this.current.charAt(0) === "-"
                        ? this.current.slice(1)
                        : `-${this.current}`;
            }
        },
        percent() {
            this.animateOperator("percent");
            if (this.current != "") {
                this.current = `${parseFloat(this.current) / 100}`;
            }
        },
        dot() {
            this.animateNumber("dot");
            if (this.current.indexOf(".") === -1) {
                this.append(".");
            }
        },
        divide() {
            this.animateOperator("divide");
            this.addtoLog("/");
        },
        times() {
            this.animateOperator("times");
            this.addtoLog("*");
        },
        minus() {
            this.animateOperator("minus");
            this.addtoLog("-");
        },
        plus() {
            this.animateOperator("plus");
            this.addtoLog("+");
        },
        equal() {
            this.animateOperator("equal");
            if (this.operatorClicked == false) {
                this.answer = eval(this.logList + this.current);
            } else {
                this.answer = "WHAT?!!";
            }
        }
    }
});