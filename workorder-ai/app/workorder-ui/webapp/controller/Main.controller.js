sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (
    Controller,
    JSONModel,
    MessageToast
) {
    "use strict";

     return Controller.extend(
        "com.mindset.agent.ui.workorderui.controller.Main",
        {

            /*
             * ----------------------------------------
             * INIT
             * ----------------------------------------
             */

            onInit: function () {

                const oModel =
                    new JSONModel({

                        messages: [
                            {
                                role: "assistant",
                                text:
                                    "Hello! How can I help you with your Work Orders?"
                            }
                        ],

                        workOrders: [],

                        loading: false

                    });


                this.getView()
                    .setModel(oModel);

            },


            /*
             * ----------------------------------------
             * ASK QUESTION
             * ----------------------------------------
             */

            onAsk: async function () {

                const oInput =
                    this.byId("questionInput");


                const question =
                    oInput
                        .getValue()
                        .trim();


                /*
                 * Validate
                 */

                if (!question) {

                    MessageToast.show(
                        "Please enter a question."
                    );

                    return;

                }


                /*
                 * Add user message
                 */

                this._addMessage(
                    "user",
                    question
                );


                /*
                 * Clear input
                 */

                oInput.setValue("");


                /*
                 * Clear previous results
                 */

                const oModel =
                    this.getView()
                        .getModel();


                oModel.setProperty(
                    "/workOrders",
                    []
                );


                /*
                 * Show loading
                 */

                oModel.setProperty(
                    "/loading",
                    true
                );


                try {

                    /*
                     * Fetch a CSRF token first.
                     *
                     * A GET/HEAD request with "X-CSRF-Token: Fetch"
                     * returns a token (and a session cookie) that
                     * must be replayed on the following state-changing
                     * (POST/PUT/DELETE) request. Without this, a
                     * CSRF-protected route responds with 403 Forbidden.
                     */

                    let csrfToken = null;

                    try {
                        const sUrl = this.getOwnerComponent().getModel().sServiceUrl + "ask"
                        const tokenResponse =
                            await fetch(
                                sUrl || "/odata/v4/work-order-agent/$metadata",
                                {
                                    method: "GET",
                                    headers: {
                                        "X-CSRF-Token": "Fetch"
                                    },
                                    credentials: "same-origin"
                                }
                            );

                        csrfToken =
                            tokenResponse.headers.get(
                                "X-CSRF-Token"
                            );

                    } catch (tokenError) {

                        /*
                         * If the token pre-flight itself fails,
                         * don't block the actual call - some
                         * routes may not require CSRF at all.
                         */

                        console.warn(
                            "CSRF token fetch failed:",
                            tokenError
                        );

                    }

                    /*
                     * Call CAP service "/odata/v4/work-order-agent/ask",
                     */
                    const sUrl = this.getOwnerComponent().getModel().sServiceUrl + "ask"
                    const response =
                        await fetch(
                            sUrl || "/odata/v4/work-order-agent/ask",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",
                                    ...(csrfToken && {
                                        "X-CSRF-Token": csrfToken
                                    })
                                },

                                credentials: "same-origin",

                                body: JSON.stringify({
                                    question: question
                                })

                            }
                        );


                    /*
                     * HTTP validation
                     */

                    if (!response.ok) {

                        const errorText =
                            await response.text();

                        console.error(
                            "CAP Error:",
                            errorText
                        );

                        throw new Error(
                            `HTTP ${response.status}`
                        );

                    }


                    /*
                     * Read JSON
                     */

                    const result =
                        await response.json();


                    console.log(
                        "CAP Response:",
                        result
                    );


                    /*
                     * Assistant response
                     */

                    this._addMessage(
                        "assistant",
                        result.answer ||
                        "I couldn't find a response."
                    );


                    /*
                     * Work Orders
                     *
                     * Expected:
                     *
                     * result.workOrders
                     */

                    const workOrders =
                        result.workOrders || [];


                    /*
                     * Set table data
                     */

                    oModel.setProperty(
                        "/workOrders",
                        workOrders
                    );


                    /*
                     * Result count
                     */

                    this.byId(
                        "resultTitle"
                    ).setText(
                        `Work Orders (${workOrders.length})`
                    );


                } catch (error) {

                    console.error(
                        "Work Order request failed:",
                        error
                    );


                    /*
                     * Assistant error message
                     */

                    this._addMessage(
                        "assistant",
                        "Sorry, I couldn't retrieve the Work Orders. Please try again."
                    );


                    MessageToast.show(
                        "Unable to retrieve Work Orders."
                    );

                } finally {

                    /*
                     * Hide loading
                     */

                    oModel.setProperty(
                        "/loading",
                        false
                    );

                }

            },


            /*
             * ----------------------------------------
             * ADD CHAT MESSAGE
             * ----------------------------------------
             */

            _addMessage: function (
                role,
                text
            ) {

                const oModel =
                    this.getView()
                        .getModel();


                const messages =
                    oModel.getProperty(
                        "/messages"
                    ) || [];


                messages.push({

                    role: role,

                    text: text

                });


                oModel.setProperty(
                    "/messages",
                    messages
                );


                /*
                 * Scroll chat to bottom
                 */

                setTimeout(() => {

                    const oList =
                        this.byId("chatList");

                    if (oList) {

                        const domRef =
                            oList.getDomRef();

                        if (domRef) {

                            domRef.scrollTop =
                                domRef.scrollHeight;

                        }

                    }

                }, 100);

            },


            /*
             * ----------------------------------------
             * SUGGESTED QUESTION
             * ----------------------------------------
             */

            onSuggestionPress: function (
                oEvent
            ) {

                const question =
                    oEvent
                        .getSource()
                        .getText();


                const oInput =
                    this.byId(
                        "questionInput"
                    );


                oInput.setValue(
                    question
                );


                this.onAsk();

            },


            /*
             * ----------------------------------------
             * WORK ORDER CLICK
             * ----------------------------------------
             */

            onWorkOrderPress: function (
                oEvent
            ) {

                const oContext =
                    oEvent
                        .getSource()
                        .getBindingContext();


                if (!oContext) {
                    return;
                }


                const workOrder =
                    oContext.getObject();


                console.log(
                    "Selected Work Order:",
                    workOrder
                );


                MessageToast.show(
                    workOrder.title ||
                    "Work Order selected"
                );

            }

        }

    );
});