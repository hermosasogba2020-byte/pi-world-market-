import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Checkout() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    piWallet: "",
  });

  const cartItems = [
    { id: 1, name: "Laptop Premium", price: 899, quantity: 1 },
    { id: 2, name: "Souris Wireless", price: 45, quantity: 2 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 10;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setStep(3);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/marketplace">
            <a className="flex items-center gap-2 text-accent hover:opacity-80 transition-opacity no-underline">
              <ArrowLeft className="w-4 h-4" />
              Continuer vos achats
            </a>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step Indicator */}
            <div className="flex gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step >= s ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    {s}
                  </div>
                  <span className="hidden sm:inline text-sm">
                    {s === 1 ? "Livraison" : s === 2 ? "Paiement" : "Confirmation"}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Adresse de Livraison</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Nom Complet</Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Jean Dupont"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Adresse</Label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Rue de la Paix"
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ville</Label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Paris"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Code Postal</Label>
                      <Input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="75001"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Pays</Label>
                    <Input
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="France"
                      className="mt-1"
                    />
                  </div>

                  <Button className="w-full mt-6" onClick={() => setStep(2)}>
                    Continuer vers le paiement
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Paiement Pi
                </h2>

                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Entrez votre adresse de portefeuille Pi pour effectuer le paiement de <span className="font-bold">{total} Pi</span>
                    </p>
                  </div>

                  <div>
                    <Label>Adresse du Portefeuille Pi</Label>
                    <Input
                      name="piWallet"
                      value={formData.piWallet}
                      onChange={handleInputChange}
                      placeholder="pi_1a2b3c4d5e6f7g8h9i0j"
                      className="mt-1 font-mono text-sm"
                    />
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Votre paiement est sécurisé avec le protocole Pi Network
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Retour
                    </Button>
                    <Button className="flex-1" onClick={handlePayment} disabled={loading || !formData.piWallet}>
                      {loading ? "Traitement..." : "Payer maintenant"}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Commande Confirmée!</h2>
                <p className="text-muted-foreground mb-6">
                  Votre commande a été reçue et sera traitée dans les 24 heures.
                </p>

                <div className="bg-muted p-4 rounded-lg mb-6 text-left">
                  <p className="text-sm text-muted-foreground">Numéro de commande</p>
                  <p className="font-mono font-bold">ORD-{Date.now().toString().slice(-8)}</p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Télécharger la facture
                  </Button>
                  <Link href="/dashboard/buyer">
                    <Button className="flex-1">Voir mes commandes</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Résumé de la Commande</h2>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">{item.price * item.quantity} Pi</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal} Pi</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{shipping} Pi</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (10%)</span>
                  <span>{tax} Pi</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span className="text-accent">{total} Pi</span>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>✓ Livraison gratuite pour les commandes supérieures à 500 Pi</p>
                <p>✓ Retours gratuits sous 30 jours</p>
                <p>✓ Garantie de satisfaction</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
