import Grid from "@mui/material/Grid";
import { createContext, useEffect, useRef, useState } from "react";
import { Switch } from "react-router-dom";
import { Sidebar } from "renderer/components/dashboard/Sidebar";
import { AuthConsumer, ProtectedRoute } from "renderer/layers/AuthLayer";
import { dashboardRoutes } from "renderer/utils/dashboard";
import { Miner } from "renderer/interfaces/pages/dashboard";
import { fetchCredit, fetchHashrates, selfAccount } from "services/api.service";
// import WAVES from "vanta/dist/vanta.waves.min";

const minerContext = createContext({} as Miner);

const Dashboard = (props: any) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const [selfFetched, setSelfFetched] = useState(false);
  const [creditsFetched, setCreditsFetched] = useState(false);
  const [miner, setMiner] = useState({
    id: "",
    email: "",
    name: "",
    shortId: "",
    mcBalance: 0,
    xmrBalance: 0,
    hashrates: [],
    avgHashrate: "0",
  } as Miner);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      // setVantaEffect(
      //   WAVES({
      //     el: myRef.current,
      //     color: 0x202225,
      //     waveSpeed: 0.3,
      //     mouseControls: false,
      //   })
      // );
    }
    return () => {
      //if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const fetchSelfData = async () => {
      try {
        const { minerClone, selfFetched } = await selfAccount(miner);
        if (selfFetched) {
          setMiner(minerClone);
          setSelfFetched(true);
        }
      } catch (error) {
        console.error("Error fetching self account data:", error);
      }
    };

    fetchSelfData();
  }, []);

  useEffect(() => {
    if (selfFetched) {
      const fetchCreditData = async () => {
        try {
          const { minerClone, selfFetched } = await fetchCredit(miner);
          if (selfFetched) {
            setMiner(minerClone);
            setCreditsFetched(true);
          }
        } catch (error) {
          console.error("Error fetching self account data:", error);
        }
      };
      fetchCreditData();
    }
  }, [selfFetched]);

  useEffect(() => {
    if (creditsFetched) {
      const fetchHashratesData = async () => {
        try {
          const { minerClone } = await fetchHashrates(miner);
          if (minerClone) {
            setMiner(minerClone);
          }
        } catch (error) {
          console.error("Error fetching self account data:", error);
        }
      };
      fetchHashratesData();
    }
  }, [creditsFetched]);

  return (
    <AuthConsumer>
      {({ authenticated }) => (
        <minerContext.Provider value={miner}>
          <Grid
            ref={myRef}
            style={{
              minHeight: "100vh",
              backgroundColor: "#080A0F",
              width: "100vw",
            }}
          >
            <Sidebar path={props.match.path} />
            <Switch>
              {dashboardRoutes.map(
                (view) =>
                  view.visible && (
                    <ProtectedRoute
                      exact={view.name == "Dashboard"}
                      path={`${props.match.path}${view.ref}`}
                      component={view.component}
                      authenticated={authenticated}
                    />
                  )
              )}
            </Switch>
          </Grid>
        </minerContext.Provider>
      )}
    </AuthConsumer>
  );
};
export default Dashboard;
export const MinerConsumer = minerContext.Consumer;
