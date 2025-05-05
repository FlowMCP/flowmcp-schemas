export const schema = {
    namespace: "memoryLol",
    name: "TwitterUsernameChanges",
    description: "Get Twitter username change history via memory.lol API.",
    docs: ["https://github.com/travisbrown/memory.lol"],
    tags: [],
    flowMCP: "1.2.0",
    root: "https://api.memory.lol",
    requiredServerParams: [],
    headers: {},
    routes: {
      queryUsernameChanges: {
        requestMethod: "GET",
        description: "Fetch username change history for a Twitter user.",
        route: "/v1/tw/:screen_name",
        parameters: [
          {
            position: { key: "screen_name", value: "{{USER_PARAM}}", location: "insert" },
            z: { primitive: "string()", options: ["regex(^[A-Za-z0-9_]{1,15}$)"] }
          }
        ],
        tests: [
          { _description: "Valid handle", screen_name: "OSINT_Ukraine" },
          { _description: "Non-existent handle", screen_name: "no_user_123456" }
        ],
        modifiers: [
          { phase: "post", handlerName: "formatHistory" }
        ]
      }
    },
    handlers: {
      formatHistory: async ({ struct, payload }) => {
        const { data } = struct
        if (!data.accounts?.length) {
          struct.data = "No username change history found.";
          return { struct, payload }
        }
        struct.data = data.accounts
            .map( acc =>
            `User ID ${acc.id_str}:\n` +
            Object
                .entries(acc.screen_names)
                .map(([name, dates]) => `- ${name} (${Array.isArray(dates) ? dates.join(" to ") : dates})` )
                .join("\n")
            )
            .join("\n\n");
        return { struct, payload };
      }
    }
  }
  