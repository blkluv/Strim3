"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.min.css");
require("@rainbow-me/rainbowkit/styles.css");
require("styles/globals.css");
// import "react-toastify/dist/ReactToastify.css";
require("antd/dist/reset.css");
require("bootstrap-icons/font/bootstrap-icons.css");
const rainbowkit_1 = require("@rainbow-me/rainbowkit");
const wagmi_1 = require("wagmi");
const chains_1 = require("wagmi/chains");
const public_1 = require("wagmi/providers/public");
const alchemy_1 = require("wagmi/providers/alchemy");
const Layout_1 = __importDefault(require("../components/Layout"));
const react_1 = require("@huddle01/react");
const react_2 = require("react");
const react_query_1 = require("react-query");
const MeetingMachineProvider_1 = __importDefault(require("../providers/MeetingMachineProvider"));
const NFTStorageProvider_1 = __importDefault(require("../providers/NFTStorageProvider"));
const { chains, publicClient, webSocketPublicClient } = (0, wagmi_1.configureChains)([chains_1.hardhat], [
    (0, public_1.publicProvider)(),
    (0, alchemy_1.alchemyProvider)({ apiKey: process.env.ALCHEMY_SEPOLIA_API_KEY }),
]);
const { connectors } = (0, rainbowkit_1.getDefaultWallets)({
    appName: "Strim3",
    projectId: process.env.WALLETCONNECT_PROJECTID,
    chains,
});
const wagmiConfig = (0, wagmi_1.createConfig)({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});
const queryClient = new react_query_1.QueryClient();
function MyApp({ Component, pageProps }) {
    const { initialize, isInitialized } = (0, react_1.useHuddle01)();
    (0, react_2.useEffect)(() => {
        initialize(process.env.NEXT_PUBLIC_HUDDLE_PROJECT_ID);
    }, []);
    return (<wagmi_1.WagmiConfig config={wagmiConfig}>
      <rainbowkit_1.RainbowKitProvider chains={chains}>
        <react_query_1.QueryClientProvider client={queryClient}>
          <NFTStorageProvider_1.default>
            <MeetingMachineProvider_1.default>
              {isInitialized ? (<Layout_1.default>
                  <Component {...pageProps}/>
                </Layout_1.default>) : ("Error")}
            </MeetingMachineProvider_1.default>
          </NFTStorageProvider_1.default>
        </react_query_1.QueryClientProvider>
      </rainbowkit_1.RainbowKitProvider>
    </wagmi_1.WagmiConfig>);
}
exports.default = MyApp;
