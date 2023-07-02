"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNFTStorage = void 0;
const nft_storage_1 = require("nft.storage");
const react_1 = require("react");
const NFTStorageClientContext = (0, react_1.createContext)(new nft_storage_1.NFTStorage({ token: "" }));
const NFTStorageProvider = (props) => {
    const { children } = props;
    return (<NFTStorageClientContext.Provider value={new nft_storage_1.NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API || "" })}>
      {children}
    </NFTStorageClientContext.Provider>);
};
const useNFTStorage = () => (0, react_1.useContext)(NFTStorageClientContext);
exports.useNFTStorage = useNFTStorage;
exports.default = NFTStorageProvider;
