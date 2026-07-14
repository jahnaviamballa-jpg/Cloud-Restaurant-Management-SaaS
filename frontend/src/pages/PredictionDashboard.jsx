import { useState, useEffect } from "react";

import PredictionCard from "../components/PredictionCard";
import PredictionTable from "../components/PredictionTable";
import PredictionChart from "../components/PredictionChart";
import SuggestionCard from "../components/SuggestionCard";

import {
  getPredictions,
  getInventoryAnalytics,
} from "../api/predictionApi";


function PredictionDashboard() {

  const [predictions, setPredictions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchPredictionData = async () => {

      try {

        const predictionResponse = await getPredictions();
        const analyticsResponse = await getInventoryAnalytics();


        console.log(
          "Prediction Response:",
          predictionResponse
        );

        console.log(
          "Inventory Analytics:",
          analyticsResponse
        );


        setPredictions(
          Array.isArray(predictionResponse)
            ? predictionResponse
            : []
        );


        setAnalytics(analyticsResponse);


      } catch (error) {

        console.error(
          "Prediction Fetch Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchPredictionData();

  }, []);



  if (loading) {

    return (
      <h2
        style={{
          textAlign:"center",
          marginTop:"100px"
        }}
      >
        Loading AI Predictions...
      </h2>
    );

  }



  return (

    <div
      style={{
        padding:"30px",
        background:"#f5f5f5",
        minHeight:"100vh"
      }}
    >


      <h1>
        🤖 AI Inventory Prediction Dashboard
      </h1>



      {/* Summary Cards */}

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(200px,1fr))",
          gap:"20px",
          marginTop:"25px"
        }}
      >


        <PredictionCard
          icon="📦"
          title="Total Inventory Items"
          value={
            analytics?.total_items || 0
          }
        />


        <PredictionCard
          icon="⚠️"
          title="Low Stock Items"
          value={
            analytics?.low_stock || 0
          }
        />


        <PredictionCard
          icon="🤖"
          title="AI Predictions"
          value={
            predictions.length
          }
        />


        <PredictionCard
          icon="📈"
          title="Critical Stock"
          value={
            analytics?.critical_stock || 0
          }
        />


      </div>




      {/* Prediction Table */}

      <div
        style={{
          marginTop:"30px"
        }}
      >

        <PredictionTable
          predictions={predictions.map((item)=>({

            id:item.inventory_id,

            item:item.item_name,

            currentStock:
              `${item.current_stock}`,

            predictedUsage:
              `${item.daily_usage}/day`,

            daysRemaining:
              `${item.days_remaining} Days`,

            recommendedOrder:
              item.recommendation,

            status:
              item.recommendation ===
              "Reorder Immediately"
              ? "🔴 Critical"
              : "🟡 Medium"

          }))}
        />


      </div>



      <PredictionChart />




      {/* Suggestions */}

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",
          gap:"20px",
          marginTop:"30px"
        }}
      >


        {
          predictions
          .filter(
            item =>
            item.recommendation !==
            "Stock Sufficient"
          )
          .map((item,index)=>(

            <SuggestionCard

              key={index}

              message={
                `${item.item_name} stock status: ${item.recommendation}`
              }

              recommendation={
                `Recommended reorder quantity: ${item.reorder_quantity}`
              }

            />

          ))
        }


      </div>



    </div>

  );

}


export default PredictionDashboard;