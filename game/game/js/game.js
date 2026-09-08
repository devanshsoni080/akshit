/* ==================================================
   VARIABLES
================================================== */

      let balance = 10000;

      let currentPeriod = 202609080001;

      let timeLeft = 30;

      let orders = [];

      let history = [];

      /*
    IMPORTANT:

    This is ONLY the current selection.
    It is NOT a confirmed bet.
*/
      let selected = {
        color: null,

        number: null,

        size: null,

        multiplier: 1,
      };

      /* ==================================================
   BALANCE
================================================== */

      function updateBalance() {
        document.getElementById("balance").innerText =
          "₹ " +
          balance.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
      }

      /* ==================================================
   COLOR
================================================== */

      function selectColor(color, button) {
        selected.color = color;

        document.querySelectorAll("[data-color]").forEach((btn) => {
          btn.classList.remove("selected");
        });

        button.classList.add("selected");
      }

      /* ==================================================
   NUMBER
================================================== */

      function selectNumber(number, button) {
        selected.number = number;

        document.querySelectorAll(".number-btn").forEach((btn) => {
          btn.classList.remove("selected");
        });

        button.classList.add("selected");
      }

      /* ==================================================
   BIG / SMALL
================================================== */

      function selectSize(size, button) {
        selected.size = size;

        document.querySelectorAll(".size-btn").forEach((btn) => {
          btn.classList.remove("selected");
        });

        button.classList.add("selected");
      }

      /* ==================================================
   MULTIPLIER
================================================== */

      function selectMultiplier(value, button) {
        selected.multiplier = value;

        document.querySelectorAll(".multiplier").forEach((btn) => {
          btn.classList.remove("selected");
        });

        button.classList.add("selected");
      }

      /* ==================================================
   ORDER NAME
================================================== */

      function makeOrderName(order) {
        let parts = [];

        if (order.color) {
          parts.push(order.color);
        }

        if (order.number !== null) {
          parts.push(order.number);
        }

        if (order.size) {
          parts.push(order.size);
        }

        return parts.length ? parts.join(" + ") : "No Selection";
      }

      /* ==================================================
   ADD DRAFT ORDER
================================================== */

      function addOrder() {
        const amount = Number(document.getElementById("amount").value);

        /* Amount validation */

        if (!amount || amount < 10) {
          alert("Minimum order amount is ₹10");

          return;
        }

        /* Selection validation */

        if (!selected.color && selected.number === null && !selected.size) {
          alert("Please select Color, Number or Big/Small");

          return;
        }

        /*
        IMPORTANT:

        Here order is ONLY DRAFT.

        Balance is NOT deducted.
        Status is NOT PENDING.
    */

        const order = {
          id: Date.now(),

          color: selected.color,

          number: selected.number,

          size: selected.size,

          multiplier: selected.multiplier,

          amount: amount,

          status: "DRAFT",

          period: null,
        };

        orders.unshift(order);

        renderOrders();

        /*
        Reset current selection
        so next order can be different.
    */

        resetSelection();
      }

      /* ==================================================
   RESET SELECTION
================================================== */

      function resetSelection() {
        selected = {
          color: null,

          number: null,

          size: null,

          multiplier: 1,
        };

        document.querySelectorAll(".selected").forEach((btn) => {
          btn.classList.remove("selected");
        });
      }

      /* ==================================================
   CONFIRM ORDER
================================================== */

      function confirmOrder(id) {
        const order = orders.find((item) => item.id === id);

        if (!order) {
          return;
        }

        /*
        Only DRAFT can be confirmed.
    */

        if (order.status !== "DRAFT") {
          return;
        }

        /* Balance check */

        if (order.amount > balance) {
          alert("Insufficient virtual balance");

          return;
        }

        /*
        IMPORTANT:

        Balance is deducted ONLY HERE.
    */

        balance -= order.amount;

        /*
        Save current period
        when user confirms.
    */

        order.period = currentPeriod;

        order.status = "PENDING";

        updateBalance();

        renderOrders();
      }

      /* ==================================================
   REMOVE DRAFT
================================================== */

      function removeOrder(id) {
        const order = orders.find((item) => item.id === id);

        /*
        Only draft orders can be removed.
    */

        if (order && order.status === "DRAFT") {
          orders = orders.filter((item) => item.id !== id);
        }

        renderOrders();
      }

      /* ==================================================
   RENDER ORDERS
================================================== */

      function renderOrders() {
        const box = document.getElementById("orders");
        const count = document.getElementById("orderCount"); if(count) count.innerText = orders.length;

        if (orders.length === 0) {
          box.innerHTML = `
            <div class="game-card empty">
                No orders yet
            </div>
        `;

          return;
        }

        box.innerHTML = orders
          .map((order) => {
            let statusClass = "status-draft";

            if (order.status === "PENDING") {
              statusClass = "status-pending";
            }

            if (order.status === "WIN") {
              statusClass = "status-win";
            }

            if (order.status === "LOSS") {
              statusClass = "status-loss";
            }

            let buttons = "";

            /*
                DRAFT:
                Confirm + Remove
            */

            if (order.status === "DRAFT") {
              buttons = `

                    <div class="d-flex gap-2 mt-2">

                        <button
                            class="confirm-btn"
                            onclick="confirmOrder(${order.id})">

                            CONFIRM ORDER

                        </button>

                        <button
                            class="remove-btn"
                            onclick="removeOrder(${order.id})">

                            REMOVE

                        </button>

                    </div>

                `;
            }

            /*
                PENDING:
                Waiting
            */

            if (order.status === "PENDING") {
              buttons = `

                    <div class="mt-2">

                        <span
                            style="
                            font-size:8px;
                            color:#8995a9;
                            ">

                            Waiting for result...

                        </span>

                    </div>

                `;
            }

            return `

                <div class="order-card">

                    <div
                        class="
                        d-flex
                        justify-content-between
                        align-items-start
                        gap-2
                        ">

                        <div>

                            <div class="order-name">
                                ${makeOrderName(order)}
                            </div>

                            <div class="order-info">

                                Amount ₹${order.amount}

                                &nbsp; • &nbsp;

                                X${order.multiplier}

                            </div>

                            ${
                              order.period
                                ? `
                                <div class="order-info">

                                    Period ${order.period}

                                </div>
                                `
                                : ""
                            }

                        </div>


                        <span
                            class="
                            order-status
                            ${statusClass}
                            ">

                            ${order.status}

                        </span>

                    </div>

                    ${buttons}

                </div>

            `;
          })
          .join("");
      }


/* ================= SEPARATE RESULT CONTROLLER BRIDGE ================= */
const RESULT_CONTROLLER_KEY = "colorGameDemoController";

function getControllerResult(period){
    try{
        const raw = localStorage.getItem(RESULT_CONTROLLER_KEY);
        if(!raw) return null;

        const saved = JSON.parse(raw);

        if(String(saved.period) !== String(period)){
            return null;
        }

        return {
            number: Number(saved.number),
            color: saved.color,
            size: saved.size
        };
    }catch(e){
        return null;
    }
}

function getRoundResult(period){
    const controlled = getControllerResult(period);

    if(controlled){
        return controlled;
    }

    const number = Math.floor(Math.random() * 10);

    return {
        number:number,
        color:getColor(number),
        size:getSize(number)
    };
}


      /* ==================================================
   RESULT COLOR
================================================== */

      function getColor(number) {
        if (number === 0 || number === 5) {
          return "Violet";
        }

        if (number === 1 || number === 3 || number === 7 || number === 9) {
          return "Green";
        }

        return "Red";
      }

      /* ==================================================
   RESULT SIZE
================================================== */

      function getSize(number) {
        return number >= 5 ? "Big" : "Small";
      }

      /* ==================================================
   SETTLE ROUND
================================================== */

      function settleRound() {
        /*
    ==================================================
    VERY IMPORTANT BUG FIX
    ==================================================

    Check PENDING orders FIRST.

    If there is NO confirmed order:
    - no WIN popup
    - no LOSS popup
    - no history
    - no balance change

    Just start next round.
    */

        const pendingOrders = orders.filter((order) => order.status === "PENDING");

        if (pendingOrders.length === 0) {
          currentPeriod++;

          document.getElementById("period").innerText = currentPeriod;
      const pm = document.getElementById("periodMini"); if(pm) pm.innerText = currentPeriod;

          return;
        }

        /* Generate result */

        const roundResult = getRoundResult(currentPeriod);

        const resultNumber = roundResult.number;

        const resultColor = roundResult.color;

        const resultSize = roundResult.size;

        let totalWin = 0;

        let hasWin = false;

        /*
        Settle ONLY confirmed orders.
    */

        pendingOrders.forEach((order) => {
          let win = true;

          /*
            COLOR MATCH
        */

          if (order.color && order.color !== resultColor) {
            win = false;
          }

          /*
            NUMBER MATCH
        */

          if (order.number !== null && order.number !== resultNumber) {
            win = false;
          }

          /*
            BIG / SMALL MATCH
        */

          if (order.size && order.size !== resultSize) {
            win = false;
          }

          /* ================= WIN ================= */

          if (win) {
            const payout = order.amount * order.multiplier;

            balance += payout;

            totalWin += payout;

            order.status = "WIN";

            hasWin = true;
          } else {

          /* ================= LOSS ================= */
            order.status = "LOSS";
          }

          /*
            Save user's exact order
            + actual result.
        */

          history.unshift({
            period: order.period,

            order: makeOrderName(order),

            result: resultNumber + " • " + resultColor + " • " + resultSize,

            status: win ? "WIN" : "LOSS",

            amount: order.amount,

            payout: win ? order.amount * order.multiplier : 0,
          });
        });

        updateBalance();

        renderOrders();

        renderHistory();

        /*
        Popup ONLY because there was
        at least one confirmed order.
    */

        if (hasWin) {
          showPopup(true, totalWin, resultNumber, resultColor, resultSize);
        } else {
          showPopup(false, 0, resultNumber, resultColor, resultSize);
        }

        /* Next period */

        currentPeriod++;

        document.getElementById("period").innerText = currentPeriod;
      const pm = document.getElementById("periodMini"); if(pm) pm.innerText = currentPeriod;
      }

      /* ==================================================
   HISTORY
================================================== */

      function renderHistory() {
        const box = document.getElementById("history");

        if (history.length === 0) {
          box.innerHTML = `

            <div class="game-card empty">

                No history yet

            </div>

        `;

          return;
        }

        box.innerHTML = history
          .map((item) => {
            const statusClass = item.status === "WIN" ? "status-win" : "status-loss";

            return `

                <div class="history-card">

                    <div class="history-period">

                        PERIOD ${item.period}

                    </div>


                    <div class="history-order">

                        YOUR ORDER:
                        ${item.order}

                    </div>


                    <div class="history-result">

                        RESULT:
                        ${item.result}

                    </div>


                    <div
                        class="
                        history-status
                        ${statusClass}
                        ">

                        ${item.status}

                        ${item.status === "WIN" ? ` • +₹${item.payout}` : ` • -₹${item.amount}`}

                    </div>

                </div>

            `;
          })
          .join("");
      }

      /* ==================================================
   POPUP
================================================== */

      function showPopup(isWin, amount, number, color, size) {
        const popup = document.getElementById("resultPopup");

        const icon = document.getElementById("resultIcon");

        const title = document.getElementById("resultTitle");

        const text = document.getElementById("resultText");

        /*
        Remove old classes.
    */

        popup.classList.remove("show", "loss-animation");

        if (isWin) {
          icon.innerText = "🎉";

          title.innerText = "YOU WIN";

          text.innerText = "₹" + amount + " credited • " + number + " • " + color + " • " + size;
        } else {
          icon.innerText = "😔";

          title.innerText = "YOU LOSE";

          text.innerText = "Result " + number + " • " + color + " • " + size;
        }

        void popup.offsetWidth;

        popup.classList.add("show");

        if (!isWin) {
          popup.classList.add("loss-animation");
        }

        setTimeout(() => {
          popup.classList.remove("show", "loss-animation");
        }, 3000);
      }

      /* ==================================================
   TIMER
================================================== */

      function updateTimer() {
        const seconds = String(timeLeft).padStart(2, "0");

        document.getElementById("timer").innerText = "00:" + seconds;
      }

      setInterval(() => {
        timeLeft--;

        if (timeLeft < 0) {
          /*
            Timer finishes.

            settleRound() itself decides
            whether there are confirmed
            orders or not.
        */

          timeLeft = 30;

          settleRound();
        }

        updateTimer();
      }, 1000);

      /* ==================================================
   INITIALIZE
================================================== */

      updateBalance();

      updateTimer();

      renderOrders();

      renderHistory();