package fu.se.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sysdiagrams")
public class Sysdiagram {
    @Id
    @Column(name = "diagram_id", nullable = false)
    private Long id;

    @Column(name = "principal_id", nullable = false)
    private Long principalId;

    @Column(name = "version")
    private Long version;
    @Column(name = "definition")
    private byte[] definition;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrincipalId() {
        return principalId;
    }

    public void setPrincipalId(Long principalId) {
        this.principalId = principalId;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public byte[] getDefinition() {
        return definition;
    }

    public void setDefinition(byte[] definition) {
        this.definition = definition;
    }

/*
 TODO [Reverse Engineering] create field to map the 'name' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @Column(name = "name", columnDefinition = "sysname not null")
    private Object name;
*/
}