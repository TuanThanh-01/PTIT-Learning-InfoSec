package com.ptit.elearningsecurity.entity.labCTF;

import com.ptit.elearningsecurity.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ChallengeCTFResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private boolean isCompleted;
    private Instant createdAt;
    @OneToOne
    @JoinColumn(name = "challenge_ctf_id")
    private ChallengeCTF challengeCTF;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
