# Getting Started

Welcome to your new CAP project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`readme.md` | this getting started guide

## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start with your domain model, in a CDS file in `db/`

## Learn More

Learn more at <https://cap.cloud.sap>.

"devDependencies": {
    "@cap-js/sqlite": "^3",
    "@huggingface/tokenizers": "^0.1.3",
    "@sap/cds-dk": "^10",
    "onnxruntime-node": "^1.20.1",
}

##### loacl
npm add onnxruntime-node
npm add @huggingface/tokenizers
npm add @huggingface/hub
    
####
npm uninstall onnxruntime-node
npm uninstall @huggingface/tokenizers
npm uninstall @huggingface/hub

rm -rf node_modules
rm -f package-lock.json
npm install