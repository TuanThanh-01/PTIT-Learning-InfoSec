package com.ptit.elearningsecurity.entity.token;

import com.ptit.elearningsecurity.entity.User;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "confirmation_token")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String token;
    private Instant createdAt;
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public ConfirmationToken(User user) {
        this.user = user;
        this.createdAt = Instant.now();
        this.token = UUID.randomUUID().toString();
    }

}
