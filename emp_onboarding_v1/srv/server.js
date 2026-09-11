const cds = require('@sap/cds');

// Custom Bootstrap Logic
cds.on('bootstrap', (app) => {
  app.get('/mainroot', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>emp_onboarding_v1 1.0.0</title>
                <meta name="color-scheme" content="dark light">
                <style>
        body {
        font-family: Avenir Next, sans-serif;
        background: #f8fbff;
        }

        body #welcome {
        margin: 30px auto 50px;
        padding: 0 30px;
        max-width: 900px;
        }

        body #welcome h1, #welcome h3, #welcome h2, #welcome p {
        margin: 20px 0;
        color: #1ec795;
        font-weight: 400;
        }

        body #welcome h3.header {
        margin: 20px 0 0 0;
        background-color: #13315d;
        color: white;
        }

        body #welcome h3 a {
        color: inherit;
        font-weight: 500;
        }

        body #welcome h3 a span {
        padding: 5px 15px;
        font-weight: 300;
        transition: all 0.2s ease-in;
        }

        body #welcome h3 a:first-child span {
        display: inline-block;
        padding: 5px 15px;
        }

        body #welcome h3 a span:hover {
        color: #92b2d0;
        }

        body #welcome ul {
        margin: 0;
        background: #91adc5;
        list-style-type: none;
        padding-inline-start: 20px;
        }

        body #welcome li {
        display: inline-grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        width: 100%;
        margin-bottom: 1px;
        background-color: #d0e9ff;
        padding: 0;
        /*
        -moz-transition: background color 0.2s ease-in;
        -webkit-transition: background 0.2s ease-in;
        -o-transition: background 0.2s ease-in;
        /* Standard */
        transition: all 0.1s ease-in;
        }

        body #welcome ul li div:not(:first-child) a {
        font-weight: 300;
        }

        body #welcome a {
        text-decoration: none;
        }

        body #welcome li a, body #welcome li > span {
        padding: 4px 10px;
        font-weight: 500;
        color: #1d5985;
        transition: all 0.1s ease-in;
        }
        body #welcome li.operation span {
        font-style: italic;
        }

        body #welcome li a span:hover {
        color: #f0faff;
        background-color: #a7c8e1;
        }

        body #welcome .preview {
        font-size: small;
        }

        footer {
        border-top: .5px solid;
        margin-top: 44px;
        padding-top: 22px;
        width: 400px;
        font-size: 90%;
        }

        @media (prefers-color-scheme: dark) {
        body { background: #0a2138; }

        body #welcome h1, #welcome h3, #welcome h2, #welcome p {
            color: #a6c1d9;
        }
        body #welcome h3 a {
            color: #e2efff;
        }
        body #welcome ul {
            background: #7894ad;
        }
        body #welcome li {
            background-color: #506d88;
        }
        body #welcome li a, body #welcome li:hover div:not(:first-child) a, body #welcome li > span {
            color: #d0e4f2;
        }
        body #welcome li a:hover {
            color: white;
            background-color: #7894ad;
        }

        body #welcome h3.header {
            background-color: #304c65;
        }

        footer {
            border-top: .5px solid #456;
            color: #567;
        }
        }
                </style>
            </head>
            <body>
                <div id="welcome">
                    <h1> Welcome to Mindset Server </h1>
                    <p class="subtitle"> Serving emp_onboarding_v1 1.0.0 </p>

                    <p> These are the paths currently served:</p>

                    <h2> Web Applications: </h2>
                    
                    <h2> Service Endpoints: </h2>
                    
                  <div id="onboardingservice-odata">
                    <h3 class="header">
                    <a href="/odata/v4/onboarding"><span>/odata/v4/onboarding</span></a><span>/</span> <a href="/odata/v4/onboarding/$metadata"><span>$metadata</span></a> 
                    </h3>
                    <ul>
                    <li id="onboardingservice-odata-onboardingrequests">
                        <div>
                        <a href="/odata/v4/onboarding/OnboardingRequests"><span>OnboardingRequests</span></a>
                        </div>
                        
                    </li>
                    <li id="onboardingservice-odata-employees">
                        <div>
                        <a href="/odata/v4/onboarding/Employees"><span>Employees</span></a>
                        </div>
                        
                    </li>
                    </ul>
                    <ul>
                    <li id="onboardingservice-odata-getworkflowtoken" class="operation">
                        <div>
                        <a href="/odata/v4/onboarding/getWorkflowToken" title="/odata/v4/onboarding/getWorkflowToken"><span>getWorkflowToken ()</span></a>
                        </div>
                    </li>
                    </ul>
                </div>
            
                <div id="mcponboarding-odata">
                    <h3 class="header">
                    <a href="/odata/v4/mcponboarding"><span>/odata/v4/mcponboarding</span></a><span>/</span> <a href="/odata/v4/mcponboarding/$metadata"><span>$metadata</span></a> 
                    </h3>
                    <ul>
                    <li id="mcponboarding-odata-onboardingrequests">
                        <div>
                        <a href="/odata/v4/mcponboarding/OnboardingRequests"><span>OnboardingRequests</span></a>
                        </div>
                        
                    </li>
                    </ul>
                    <ul>
                    </ul>
                </div>
            
                <div id="mcponboarding-rest">
                    <h3 class="header">
                    <a href="/rest/mcponboarding"><span>/rest/mcponboarding</span></a> 
                    </h3>
                    <ul>
                    <li id="mcponboarding-rest-onboardingrequests">
                        <div>
                        <a href="/rest/mcponboarding/OnboardingRequests"><span>OnboardingRequests</span></a>
                        </div>
                        
                    </li>
                    </ul>
                    <ul>
                    </ul>
                </div>
            
                <div id="mcponboarding-hcql">
                    <h3 class="header">
                    <a href="/hcql/mcponboarding"><span>/hcql/mcponboarding</span></a> 
                    </h3>
                    <ul>
                    <li id="mcponboarding-hcql-onboardingrequests">
                        <div>
                        <a href="/hcql/mcponboarding/OnboardingRequests"><span>OnboardingRequests</span></a>
                        </div>
                        
                    </li>
                    </ul>
                    <ul>
                    </ul>
                </div>
            
                <div id="mcponboarding-mcp">
                    <h3 class="header">
                    <a href="/mcp/mcponboarding"><span>/mcp/mcponboarding</span></a> 
                    </h3>
                    <ul>
                    <li id="mcponboarding-mcp-onboardingrequests">
                        <div>
                        <a href="/mcp/mcponboarding/OnboardingRequests"><span>OnboardingRequests</span></a>
                        </div>
                        
                    </li>
                    </ul>
                    <ul>
                    </ul>
                </div>
            
                <div id="mcponboardingannotte-mcp">
                    <h3 class="header">
                    <a href="/mcp/mcponboarding-annotte"><span>/mcp/mcponboarding-annotte</span></a> 
                    </h3>
                    <ul>
                    <li id="mcponboardingannotte-mcp-onboardingrequests">
                        <div>
                        <a href="/mcp/mcponboarding-annotte/OnboardingRequests"><span>OnboardingRequests</span></a>
                        </div>
                        
                    </li>
                    </ul>
                    <ul>
                    </ul>
                </div>
        

                    <footer>
                        This is an automatically generated page. <br>
                        You can replace it with a custom <code>./app/index.html</code>.
                    </footer>
                </div>

            <script src="https://port35729-workspaces-ws-rhlf1.us10.applicationstudio.cloud.sap/livereload.js?snipver=1&port=443" async="" defer=""></script></body>
        </html>
    `;
    res.send(html);
  });
});

// Start the CAP service
module.exports = cds.server;