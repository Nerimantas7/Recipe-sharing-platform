package lt.receptai.rsp.entity;

public enum RoleType {
    ROLE_ADMIN("Admin Role"),
    ROLE_USER("User Role"),
    ROLE_GUEST("Guest Role");

    private final String name;

    RoleType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
