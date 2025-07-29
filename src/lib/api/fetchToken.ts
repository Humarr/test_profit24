export const fetchToken = async () => {
      try {
        const res = await fetch(`/api/cookies?type=auth`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok || !data.token)
          throw new Error(data.error || "Failed to fetch token");
        return data.token;
      } catch (error) {
        console.error("Failed to fetch token:", error);
        return null;
      }
    };