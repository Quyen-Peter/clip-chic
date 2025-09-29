export function normalizeCharms(charms) {
    return charms.map(charm => ({
      ...charm,
      // If charm doesn't have an id, generate a consistent one
      id: charm.id ?? `charm-${charm.charmId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));
  }
  