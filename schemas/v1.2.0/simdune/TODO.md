# sim.dune API Implementation TODO

## 🎯 Ziel
Vollständige Implementation aller sim.dune API Endpoints mit separaten Schema-Dateien pro Route.

## 📁 Datei-Struktur
```
schemas/v1.2.0/simdune/
├── token-holders.mjs     ❌ NEU - Token holder analysis
├── transactions.mjs      ❌ NEU - Transaction history  
├── balances.mjs         ❌ NEU - Real-time balances
├── collectibles.mjs     ❌ NEU - NFT collections
├── activity.mjs         ❌ NEU - Decoded activity feed
├── sei-token-info.mjs   ✅ BESTEHEND (evtl. umbenennen zu token-info.mjs)
└── TODO.md              ✅ Diese Datei
```

## 📝 Implementation Reihenfolge

### 1. ✅ token-holders.mjs
- **Dokumentation**: https://docs.sim.dune.com/evm/token-holders
- **Supported Chains**: https://sim-proxy.dune-d2f.workers.dev/v1/evm/supported-chains (dynamisch geladen)
- **API Endpoint**: `GET /v1/evm/token-holders/{chain_id}/{token_address}`
- **Test Command**: `node tests/manual/test-schemas.mjs --namespace=simdune --file=token-holders.mjs`
- **Status**: ✅ Implementiert und getestet
- **Supported Chains gefunden**: ✅ 38+ Chains implementiert
- **Tests**: ✅ USDC auf Base + WETH auf Ethereum erfolgreich

### 2. ✅ transactions.mjs  
- **Dokumentation**: https://docs.sim.dune.com/evm/transactions
- **Supported Chains**: https://sim-proxy.dune-d2f.workers.dev/v1/evm/supported-chains (dynamisch geladen)
- **API Endpoint**: `GET /v1/evm/transactions/{uri}`
- **Test Command**: `node tests/manual/test-schemas.mjs --namespace=simdune --file=transactions.mjs`
- **Status**: ✅ Implementiert und getestet
- **Supported Chains gefunden**: ✅ 33+ Chains implementiert
- **Tests**: ✅ Vitalik's Transaktionen auf Ethereum + Base erfolgreich

### 3. ✅ balances.mjs
- **Dokumentation**: https://docs.sim.dune.com/evm/balances
- **Supported Chains**: https://sim-proxy.dune-d2f.workers.dev/v1/evm/supported-chains (dynamisch geladen)
- **API Endpoint**: `GET /v1/evm/balances/{uri}`
- **Test Command**: `node tests/manual/test-schemas.mjs --namespace=simdune --file=balances.mjs`
- **Status**: ✅ Implementiert und getestet
- **Supported Chains gefunden**: ✅ 34+ Chains implementiert
- **Tests**: ✅ Vitalik's Balances auf Ethereum + Base erfolgreich

### 4. ✅ collectibles.mjs
- **Dokumentation**: https://docs.sim.dune.com/evm/collectibles
- **Supported Chains**: https://sim-proxy.dune-d2f.workers.dev/v1/evm/supported-chains (dynamisch geladen)
- **API Endpoint**: `GET /v1/evm/collectibles/{address}`
- **Test Command**: `node tests/manual/test-schemas.mjs --namespace=simdune --file=collectibles.mjs`
- **Status**: ✅ Implementiert und getestet
- **Supported Chains gefunden**: ✅ 60+ Chains implementiert
- **Tests**: ✅ Vitalik's NFTs auf Ethereum + Base erfolgreich

### 5. ✅ activity.mjs
- **Dokumentation**: https://docs.sim.dune.com/evm/activity
- **Supported Chains**: https://sim-proxy.dune-d2f.workers.dev/v1/evm/supported-chains (dynamisch geladen)
- **API Endpoint**: `GET /v1/evm/activity/{uri}`
- **Test Command**: `node tests/manual/test-schemas.mjs --namespace=simdune --file=activity.mjs`
- **Status**: ✅ Implementiert und getestet
- **Supported Chains gefunden**: ✅ 57+ Chains implementiert
- **Tests**: ✅ Vitalik's Activity Feed erfolgreich

### 6. ✅ token-info.mjs (Überarbeitung abgeschlossen)
- **Dokumentation**: https://docs.sim.dune.com/evm/token-info
- **Supported Chains**: https://sim-proxy.dune-d2f.workers.dev/v1/evm/supported-chains (dynamisch geladen)
- **API Endpoint**: `GET /v1/evm/token-info/{uri}`
- **Test Command**: `node tests/manual/test-schemas.mjs --namespace=simdune --file=token-info.mjs`
- **Status**: ✅ Vollständig überarbeitet und getestet
- **Supported Chains gefunden**: ✅ 70+ Chains implementiert (inkl. Flow, Hemi, Lens, etc.)
- **Tests**: ✅ USDC + Native ETH + Base erfolgreich
- **Änderungen**: `sei-token-info.mjs` → `token-info.mjs` (allgemein verwendbar)

## 🔄 Arbeitsweise pro Route

### Schritt 1: Dokumentation analysieren
1. Dokumentation der Route herunterladen
2. **KRITISCH**: Supported Chains Sektion finden
3. **STOPP** bei fehlenden Chains → Rücksprache mit User
4. Parameter und Response-Format analysieren

### Schritt 2: Schema implementieren
1. Neue .mjs Datei erstellen
2. Namespace: `"simdune"`
3. Eine Route pro Datei
4. Parameter-Validierung mit Zod
5. Test-Cases aus Dokumentation ableiten

### Schritt 3: Testen
1. Schema sofort testen: `node tests/manual/test-schemas.mjs --namespace=simdune --file=[FILENAME]`
2. Bei Erfolg: Nächste Route
3. Bei Fehlern: Debugging und Korrektur

### Schritt 4: Status aktualisieren
1. TODO.md Status auf ✅ setzen
2. Dokumentation mit `npm run docs:generate` aktualisieren

## ⚠️ Kritische Regeln

### 🛑 STOPP-Bedingungen
- **Supported Chains nicht in Doku gefunden** → Rücksprache mit User
- **API-Struktur unklar** → Rücksprache mit User
- **Tests schlagen fehl** → Debugging vor nächster Route

### 🌐 Chain-Alias System
Nutze Standard ALIAS-Namen:
- `ETHEREUM_MAINNET` (1)
- `ETHEREUM_SEPOLIA` (11155111)
- `ARBITRUM_ONE` (42161)
- `AVALANCHE_CCHAIN` (43114)
- `BASE_MAINNET` (8453)
- `BNB_CHAIN` (56)
- `POLYGON_MAINNET` (137)
- `OPTIMISM_MAINNET` (10)
- etc.

### 📚 Test-Wallets
Standard-Adressen für Tests:
- **Vitalik**: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045` (Multi-Chain Activity)
- **Standard Token**: USDC Contracts auf verschiedenen Chains
- **NFT Wallet**: Bekannte NFT-reiche Adressen

## 📊 Fortschritt
- ✅ Vollständig überarbeitete Implementation: 6/6 Routen
- ✅ Implementierte Routen: token-holders.mjs, transactions.mjs, balances.mjs, collectibles.mjs, activity.mjs, token-info.mjs
- **Gesamt**: 6/6 Routen implementiert und getestet (100%)
- **Überarbeitung**: sei-token-info.mjs → token-info.mjs (allgemein verwendbar)

## 📝 Notizen
- Alle APIs erfordern `X-Sim-Api-Key` Header
- API-Schlüssel: `{{DUNE_SIM_API_KEY}}`
- Base URL: `https://api.sim.dune.com/v1`
- Pagination: Cursor-based mit `next_offset`

---

**Status**: ✅ VOLLSTÄNDIG ABGESCHLOSSEN & ÜBERARBEITET  
**Alle 6 Routen**: Implementiert, getestet und produktionsbereit  
**Letzte Aktualisierung**: 26. August 2025 - Final Complete