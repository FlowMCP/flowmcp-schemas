# New Schemas Development Guide

This directory (`tests/new-schemas/`) is dedicated to developing and testing new FlowMCP schemas.

## 📋 Core Rules

### ✅ Allowed:
- **Real API calls** to production endpoints
- **Complete implementation** of all routes and handlers
- **All tests must pass** without exceptions
- **Schema structure** identical to `./schemas/` for easy migration

### ❌ Forbidden:
- **Mock data** of any kind (not even as fallback)
- **Skipping or omitting** tests
- **Rewriting core functionality** without real API calls
- **Incomplete implementations**

## 🧪 Testing & Validation

### Quick testing commands:
```bash
# Test all new schemas
npm run test:new-schemas

# Test specific schema
node tests/manual/test-schemas.mjs --namespace=NAMESPACE_NAME

# Show help
npm run test:debug:help
```

### Complete documentation:
- **Testing commands:** See `package.json` scripts with `ai-run-first` comment
- **Schema standards:** Documented in `./schemas/SCHEMAS.md`
- **Available tools:** All important links in `./schemas/SCHEMAS.md`

## 🔄 Schema Lifecycle

### 1. Development
- Create schema in `tests/new-schemas/PROVIDER/`
- Develop according to schema standards from `./schemas/SCHEMAS.md`
- All tests must **pass**

### 2. On-Hold (Issues)
- For serious problems → **read documentation** and **think deeply about the problem**
- **After agreement with USER:** Move schema to `.not_supported/`
- Reasons for on-hold: API limitations, broken endpoints, security issues

### 3. Production-Ready
- All tests passed ✅
- **After agreement with USER:** Move folder to `./schemas/v1.2.0/`
- Schema is production-ready

## 🎯 Finding New Ideas

### Monitor GitHub Issues:
- **Prefix:** `"Support for"` (e.g., "Support for moralis.com")
- **Regular checking:** New schema requests in GitHub Issues
- **Implementation:** Develop directly in `tests/new-schemas/`

### Typical issue formats:
```
Support for [API-Name]
Support for [Provider] API
Support for [Service-Name] integration
```

## 📁 Folder Structure

```
tests/new-schemas/
├── provider-name/
│   ├── schema1.mjs
│   ├── schema2.mjs
│   └── schema3.mjs
└── NEW-SCHEMAS.md (this file)
```

## ⚠️ Important Reminders

1. **NO Mock Data** - Schema must call real APIs
2. **All tests pass** - No exceptions or workarounds
3. **USER agreement** - Moves only after confirmation
4. **Read SCHEMAS.md** - Always consult documentation for problems
5. **GitHub Issues** - Regularly search for new "Support for" requests

---

**For questions or problems:** Always consult `./schemas/SCHEMAS.md` first and think deeply about the problem before seeking agreement with the USER.