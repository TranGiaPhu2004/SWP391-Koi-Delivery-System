package fu.se.model;

import jakarta.persistence.*;
import org.hibernate.annotations.Nationalized;

@Entity
public class Feedback {
    @Id
    @Column(name = "FeedbackID", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID")
    private Long orderID;

    @Nationalized
    @Lob
    @Column(name = "FeedbackDescription")
    private String feedbackDescription;

    @Column(name = "Rating")
    private Long rating;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public String getFeedbackDescription() {
        return feedbackDescription;
    }

    public void setFeedbackDescription(String feedbackDescription) {
        this.feedbackDescription = feedbackDescription;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

}